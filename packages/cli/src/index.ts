import { default as cac } from 'cac'
import { run } from './runner.js'
import { getVersion } from './version.js'

const cli = cac('nxtest')

cli.help()
    .version(await getVersion())
    .option('--mode [mode]', 'choose your vitest mode', {
        default: 'run',
    })
    .option('--coverage, -c', 'choose your vitest mode', {
        default: false,
    })

cli.command('[...filters]').action(run)

cli.parse()
