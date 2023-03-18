import { describe, it, expect } from 'vitest'
import { NextApiRequestBuilder, ResponseMock } from '../src'
import EchoEndpoint from './fixture/EchoEndpoint'

describe('echo endpoint', () => {
    it('should read parameters in the request query and url', () => {
        const req = new NextApiRequestBuilder()
            .setMethod('GET')
            .setQuery({
                foo: 'hello',
            })
            .setUrl('http://localhost/api/hello/echo')
            .build()
        const res = ResponseMock()

        EchoEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getBodyJson()).toStrictEqual({
            foo: 'hello',
            url: 'http://localhost/api/hello/echo',
        })
    })
})
