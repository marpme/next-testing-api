import { NextApiResponse } from 'next'
import { sendStatusCode, redirect } from 'next/dist/server/api-utils'

import { ServerResponse } from 'http'
import { IncomingMessage } from 'node:http'
import { Socket } from 'net'
import { sendData, sendJson } from './NextApiTransformer'

const mockBodyResponseHandling = <T>(apiRes: NextApiResponseMock<T>) => {
    let body: Buffer

    const originalEnd = apiRes.end
    apiRes.end = ((...rest: any[]) => {
        originalEnd.apply(apiRes, rest as any)

        const [data] = rest

        if (data instanceof Buffer) {
            body = Buffer.from(data)
            return
        }

        if (typeof data === 'string') {
            body = Buffer.from(data)
            return
        }

        if (data === undefined || data === null) {
            body = Buffer.alloc(0)
            return
        }

        throw Error(
            'writing unsupported type into api response! ' + typeof data
        )
    }) as any

    apiRes.getBodyJson = (): T => {
        return JSON.parse(body.toString('utf-8'))
    }

    apiRes.getBodyBuffer = (): Buffer => {
        return Buffer.from(body)
    }

    apiRes.getBodyString = (): string => {
        return body.toString('utf-8')
    }

    apiRes.getContentLength = (): number => {
        return apiRes.getBodyBuffer().length
    }

    apiRes.getStatusCode = (): number => {
        return apiRes.statusCode
    }

    apiRes.isRedirect = (): boolean => {
        return !!apiRes.redirectUrl
    }

    apiRes.redirectLocation = () => {
        return apiRes.redirectUrl
    }

    return apiRes
}

export type NextApiResponseMock<T> = NextApiResponse & {
    redirectUrl: string
    getBodyJson: () => T
    getBodyBuffer: () => Buffer
    getBodyString: () => string

    getContentLength: () => number
    getStatusCode: () => number

    isRedirect: () => boolean
    redirectLocation: () => number | string | string[] | undefined
}

export const ResponseMock = <T = any>(): NextApiResponseMock<T> => {
    let apiRes = new ServerResponse(
        new IncomingMessage(new Socket())
    ) as NextApiResponseMock<T>

    apiRes.status = (statusCode) => sendStatusCode(apiRes, statusCode)
    apiRes.send = (data) => sendData(apiRes, data)
    apiRes.json = (data) => sendJson(apiRes, data)
    apiRes.redirect = (statusOrUrl: number | string, url?: string) => {
        if (typeof statusOrUrl === 'string') {
            apiRes.redirectUrl = statusOrUrl
        } else if (typeof url === 'string') {
            apiRes.redirectUrl = url
        }

        return redirect(apiRes, statusOrUrl, url)
    }

    apiRes.setPreviewData = () => {
        return apiRes
    }
    apiRes.clearPreviewData = () => {
        return apiRes
    }
    apiRes.revalidate = async () => {
        // empty on purpose
    }

    apiRes = mockBodyResponseHandling(apiRes)

    return apiRes
}
