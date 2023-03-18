import { NextApiRequest, NextApiResponse } from 'next'

const EchoEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    const param = req.query.foo as string
    const url = req.url
    res.status(200).json({ foo: param, url })
}

export default EchoEndpoint
