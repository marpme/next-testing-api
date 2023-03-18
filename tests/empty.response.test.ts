import { describe, it, expect } from 'vitest'
import { NextApiRequestBuilder, ResponseMock } from '../src'
import EmptyEndpoint from './fixture/EmptyEndpoint'

describe('empty endpoint', () => {
    it('should accept empty response with no body', () => {
        const req = new NextApiRequestBuilder().build()
        const res = ResponseMock()

        EmptyEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(204)
        expect(res.getBodyBuffer()).toEqual(Buffer.alloc(0))
    })
})
