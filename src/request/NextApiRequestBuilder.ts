import { NextApiRequest } from 'next'
import { IncomingHttpHeaders } from 'node:http'
import { Socket } from 'node:net'
import { NextApiRequestMock } from './NextApiRequestMock'

export class NextApiRequestBuilder {
    private readonly req: NextApiRequestMock

    constructor() {
        this.req = new NextApiRequestMock(
            new Socket({
                readable: true,
                writable: true,
            })
        )
    }

    setBody(body: Record<string, any> | any[]): NextApiRequestBuilder {
        this.req.body = body
        return this
    }

    setCookies(value: Partial<{ [p: string]: string }>): NextApiRequestBuilder {
        this.req.cookies = { ...this.req.cookies, ...value }
        return this
    }

    setHeaders(value: IncomingHttpHeaders): NextApiRequestBuilder {
        this.req.headers = { ...this.req.headers, ...value }
        return this
    }

    setMethod(value: string): NextApiRequestBuilder {
        this.req.method = value
        return this
    }

    setUrl(value: string): NextApiRequestBuilder {
        this.req.url = value
        return this
    }

    setQuery(query: Record<string, string | string[]>): NextApiRequestBuilder {
        this.req.query = query
        return this
    }

    build(): NextApiRequest {
        return this.req
    }
}
