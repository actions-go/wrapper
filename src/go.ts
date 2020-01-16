import * as exec from '@actions/exec'
import * as path from 'path'
import * as os from 'os'

export function binPath(): string {
  if (os.platform() === 'win32') {
    return 'main_windows.exe'
  }
  return path.join(__dirname, ['main_', os.platform()].join(''))
}

export async function go(args: string[], stdout?: string[]): Promise<number> {
  const options = {
    ignoreReturnCode: true,
    silent: true,
    listeners: {
      stdout: (data: Buffer) => {
        process.stdout.write(data)
        if (stdout != null) {
          stdout.push(data.toString())
        }
      }
    }
  }
  return exec.exec(binPath(), args.slice(2), options)
}
