import path from 'node:path'
import fs from 'node:fs'
import { defaultVitestConfig } from './vitestConfig.js'
import { assertCommands } from './command.js'
import { startVitest } from 'vitest/node'

export const run = async (
    commands: string[],
    cliOptions: Record<string, any>
) => {
    assertCommands(commands)

    const configDir = path.join(process.cwd(), 'node_modules', '.nxtest')
    const configPath = path.join(configDir, 'vitest.config.ts')

    await fs.mkdirSync(configDir, { recursive: true })
    await fs.writeFileSync(
        configPath,
        `export default ${JSON.stringify(
            defaultVitestConfig({ coverage: cliOptions.coverage })
        )}`
    )

    await startVitest('test', [], {
        config: configPath,
    })
}
