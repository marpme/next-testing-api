import { describe, it, expect, beforeEach } from 'vitest'
import {
    NextApiRequestBuilder,
    NextApiResponseMock,
    ResponseMock,
} from '../src'
import { NextApiRequest } from 'next'
import ForwardEndpoint from './fixture/ForwardEndpoint'

describe('forward endpoint', () => {
    let req: NextApiRequest, res: NextApiResponseMock<any>

    beforeEach(() => {
        req = new NextApiRequestBuilder()
            .setMethod('POST')
            .setCookies({ myCookie: 'value' })
            .setHeaders({
                authorization: 'panda',
            })
            .setBody({ all: true })
            .build()
        res = ResponseMock()
    })

    it('should forward req as response', () => {
        ForwardEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getHeader('authorization')).toEqual('panda')
        expect(res.getBodyJson()).toStrictEqual({
            body: {
                all: true,
            },
            cookies: {
                myCookie: 'value',
            },
            method: 'POST',
        })
        expect(res.getBodyBuffer()).toStrictEqual(
            Buffer.from(
                JSON.stringify({
                    body: {
                        all: true,
                    },
                    method: 'POST',
                    cookies: {
                        myCookie: 'value',
                    },
                })
            )
        )
    })

    it('should forward req as response buffer', () => {
        ForwardEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getBodyBuffer()).toStrictEqual(
            Buffer.from(
                JSON.stringify({
                    body: {
                        all: true,
                    },
                    method: 'POST',
                    cookies: {
                        myCookie: 'value',
                    },
                })
            )
        )
    })

    it('should forward req as response text', () => {
        ForwardEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getBodyString()).toStrictEqual(
            JSON.stringify({
                body: {
                    all: true,
                },
                method: 'POST',
                cookies: {
                    myCookie: 'value',
                },
            })
        )
    })
})
