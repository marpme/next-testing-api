import { describe, it, expect } from 'vitest'
import getNameEndpoint from "./fixture/Name";
import { NextApiRequestBuilder, ResponseMock } from "../src";

describe('testing response', () => {
  it('simple JSON response', async () => {
    const req = new NextApiRequestBuilder().build()
    const res = ResponseMock<{ name: string }>()

    getNameEndpoint(req, res)

    expect(res.getStatusCode()).toEqual(200)
    expect(res.getBodyJson()).toStrictEqual({ name: "John Doe" })
  })

  it('simple JSON response', async () => {
    const req = new NextApiRequestBuilder().build()
    const res = ResponseMock<{ name: string }>()

    getNameEndpoint(req, res)

    expect(res.getStatusCode()).toEqual(200)
    expect(res.getBodyJson()).toStrictEqual({ name: "John Doe" })
  })
})