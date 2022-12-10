import { NextApiRequest, NextApiResponse } from 'next'

const RedirectEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    res.redirect(307, '/path/home')
}

export default RedirectEndpoint
