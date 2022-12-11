import { IncomingMessage } from 'node:http'
import { Socket } from 'node:net'
import { NextApiRequest } from 'next'
import { Env } from '@next/env'

export class NextApiRequestMock
    extends IncomingMessage
    implements NextApiRequest
{
    body: any
    cookies: Partial<{ [p: string]: string }>
    env: Env
    query: Partial<{ [p: string]: string | string[] }>

    constructor(socket: Socket) {
        super(socket)
        this.cookies = {}
        this.env = {}
        this.query = {}
    }
}
