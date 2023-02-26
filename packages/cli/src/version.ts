import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import * as util from 'util'

const filePath = url.fileURLToPath(import.meta.url)
const dirPath = path.dirname(filePath)

const promisedReadFile = util.promisify(fs.readFile)
export const getVersion = async () => {
    const fileBuffer = await promisedReadFile(
        path.join(dirPath, '..', 'package.json')
    )

    return JSON.parse(fileBuffer.toString('utf-8')).version
}
