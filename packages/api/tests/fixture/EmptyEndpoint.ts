import { NextApiRequest, NextApiResponse } from 'next'

const EmptyEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(204).end()
}

export default EmptyEndpoint
