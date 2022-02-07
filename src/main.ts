import * as core from '@actions/core'
import {go} from './go'

async function run(): Promise<void> {
  try {
    process.exit(await go(process.argv))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
