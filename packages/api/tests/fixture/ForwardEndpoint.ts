import { NextApiRequest, NextApiResponse } from 'next'

const ForwardEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers['authorization'] !== 'panda') {
        res.status(500).end()
    }

    res.status(200)
        .setHeader('Cookie', 'fantasy')
        .setHeader('authorization', req.headers['authorization'] as string)
        .json({ body: req.body, method: req.method, cookies: req.cookies })
}

export default ForwardEndpoint
