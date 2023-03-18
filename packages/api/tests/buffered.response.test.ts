import { describe, it, expect } from 'vitest'
import { NextApiRequestBuilder, ResponseMock } from '../src'
import BufferedEndpoint from './fixture/BufferedEndpoint'

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
