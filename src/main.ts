import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const linesString: string = core.getInput('lines')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    core.debug(`Lines: ${linesString}`)

    const lines = linesString.split('\n')
    for (let i = 0; i < lines.length; i++) {
      core.debug(`${i}: ${__dirname}__${lines[i]}`)
      core.debug(process.cwd())
      core.debug(process.argv[1])
    }

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
