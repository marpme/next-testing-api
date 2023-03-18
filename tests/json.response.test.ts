import { describe, it, expect } from 'vitest'
import { NextApiRequestBuilder, ResponseMock } from '../src'
import JSONEndpoint from './fixture/JSONEndpoint'

describe('json response', () => {
    it('should be able to parse simple JSON', () => {
        const req = new NextApiRequestBuilder().build()
        const res = ResponseMock<{ name: string }>()

        JSONEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(200)
        expect(res.getBodyJson()).toStrictEqual({ name: 'John Doe' })
    })
})
