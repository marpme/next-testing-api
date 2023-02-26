import c from 'picocolors'

export const logError = (...args: string[]) => {
    console.log(`\n❌  ${c.bold(c.red('Error'))}:`, ...args, '\n')
}

export const logSuggestion = (...args: string[]) => {
    console.log(`🛠️${c.bold(c.blue('Suggestion:'))}`, ...args)
}

export const logGuide = (guideLink?: string) => {
    console.log(
        `📖 See ${c.green('nxtest -h')} for more options and helpers.${
            guideLink ? `\n🔗 ${c.bold(guideLink)}` : ''
        }`
    )
}
