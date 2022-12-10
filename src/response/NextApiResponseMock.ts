import { NextApiResponse } from 'next'
import { sendStatusCode, redirect } from 'next/dist/server/api-utils'

import { ServerResponse } from 'http'
import { IncomingMessage } from 'node:http'
import { Socket } from 'net'
import { sendData, sendJson } from './NextApiTransformer'

const mockBodyResponseHandling = <T>(apiRes: NextApiResponseMock<T>) => {
    let body: Buffer

    apiRes.end = ((data: any) => {
        if (data instanceof Buffer) {
            body = Buffer.from(data)
            return
        }

        if (typeof data === 'string') {
            body = Buffer.from(data)
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

    return apiRes
}

export type NextApiResponseMock<T> = NextApiResponse<T> & {
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
    apiRes.redirect = (statusOrUrl: number | string, url?: string) =>
        redirect(apiRes, statusOrUrl, url)

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

    apiRes.getStatusCode = (): number => {
        return apiRes.statusCode
    }

    apiRes.isRedirect = (): boolean => {
        return apiRes.getHeader('Location') !== undefined
    }

    apiRes.redirectLocation = () => {
        return apiRes.getHeader('Location')
    }

    return apiRes
}
