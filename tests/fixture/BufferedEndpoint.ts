import { NextApiRequest, NextApiResponse } from 'next'

const BufferedEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send(
        Buffer.from(
            JSON.stringify({
                a: 'b',
                c: 'd',
            })
        )
    )
}

export default BufferedEndpoint
