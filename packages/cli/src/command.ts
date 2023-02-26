import c from 'picocolors'
import { logError, logGuide, logSuggestion } from './logger.js'

export const assertCommands = (commands: string[]) => {
    if (commands.length > 0) {
        logError(
            `Custom commands or filters are not supported. Please remove them from your CLI.`
        )
        logSuggestion(
            `Run ${c.bold(c.blue('nxtest'))}`,
            `without any command and required your favorite cli options`
        )
        logGuide()
        process.exit(-1)
    }
}
