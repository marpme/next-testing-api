import { describe, it, expect } from 'vitest'
import { NextApiRequestBuilder, ResponseMock } from '../src'
import RedirectEndpoint from './fixture/RedirectEndpoint'

describe('redirect endpoint', () => {
    it('should redirect response', () => {
        const req = new NextApiRequestBuilder().build()
        const res = ResponseMock()

        RedirectEndpoint(req, res)

        expect(res.getStatusCode()).toEqual(307)

        expect(res.isRedirect()).toEqual(true)
        expect(res.redirectLocation()).toEqual('/path/home')
    })
})
