import { describe, it, expect, beforeEach } from 'vitest'
import {
    NextApiRequestBuilder,
    NextApiResponseMock,
    ResponseMock,
} from '../src'
import JSONEndpoint from './fixture/JSONEndpoint'
import ForwardEndpoint from './fixture/ForwardEndpoint'
import { NextApiRequest } from 'next'
import BufferedEndpoint from './fixture/BufferedEndpoint'
import RedirectEndpoint from './fixture/RedirectEndpoint'

describe('testing response', () => {
    it('should be able to parse simple JSON', () => {
        const req = new NextApiRequestBuilder().build()
        const res = ResponseMock<{ name: string }>()

        JSONEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getBodyJson()).toStrictEqual({ name: 'John Doe' })
    })

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

    describe('buffered endpoint', () => {
        it('should handle buffered response as JSON', () => {
            const req = new NextApiRequestBuilder().build()
            const res = ResponseMock<{ name: string }>()

            BufferedEndpoint(req, res)

            expect(res.getStatusCode()).toEqual(200)
            expect(res.getHeader('Content-Type')).toEqual(
                'application/octet-stream'
            )
            expect(res.getBodyJson()).toStrictEqual({
                a: 'b',
                c: 'd',
            })
        })

        it('should handle buffered response as string', () => {
            const req = new NextApiRequestBuilder().build()
            const res = ResponseMock<{ name: string }>()

            BufferedEndpoint(req, res)

            expect(res.getStatusCode()).toEqual(200)
            expect(res.getHeader('Content-Type')).toEqual(
                'application/octet-stream'
            )
            expect(res.getBodyString()).toStrictEqual(
                JSON.stringify({
                    a: 'b',
                    c: 'd',
                })
            )
        })

        it('should handle buffered response as raw Buffer', () => {
            const req = new NextApiRequestBuilder().build()
            const res = ResponseMock<{ name: string }>()

            BufferedEndpoint(req, res)

            expect(res.getStatusCode()).toEqual(200)
            expect(res.getHeader('Content-Type')).toEqual(
                'application/octet-stream'
            )
            expect(res.getBodyBuffer()).toStrictEqual(
                Buffer.from(
                    JSON.stringify({
                        a: 'b',
                        c: 'd',
                    })
                )
            )
        })
    })

    it('should redirect response', () => {
        const req = new NextApiRequestBuilder().build()
        const res = ResponseMock()

        RedirectEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(307)

        expect(res.isRedirect()).toEqual(true)
        expect(res.redirectLocation()).toEqual('/path/home')
    })
})
