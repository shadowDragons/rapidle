import { exec } from 'child_process'
import { promisify } from 'util'
import * as os from 'os'

const execAsync = promisify(exec)

async function getMacApps(keyword: string): Promise<AppInfo[]> {
  try {
    const { stdout } = await execAsync('ls /Applications')

    const searchApps = stdout.split('\n').filter((app) => app.endsWith('.app'))

    let idCounter = 0 // 初始化计数器

    const apps = searchApps.map((app) => ({
      id: ++idCounter,
      title: app.replace('.app', ''),
      exec: `open "/Applications/${app}"`,
      isApp: true
    }))

    if (!keyword || keyword.trim() === '') {
      return apps.slice(0, 6)
    }

    const lowerKeyword = keyword.toLowerCase()

    const matchedApps = apps
      .filter((app) => app.title.toLowerCase().includes(lowerKeyword))
      .slice(0, 6)

    return matchedApps
  } catch (error) {
    console.error('Error getting Mac apps:', error)
    return []
  }
}
async function getWindowsApps(keyword: string): Promise<AppInfo[]> {
  try {
    const { stdout } = await execAsync(
      'powershell -command "& {$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Get-StartApps | ConvertTo-Json}"'
    )
    let idCounter = 0

    const apps: AppInfo[] = JSON.parse(stdout).map((app) => ({
      id: ++idCounter,
      title: app.Name,
      exec: `powershell -command "Start-Process '${app.AppID}'"`,
      isApp: true
    }))

    if (!keyword || keyword.trim() === '') {
      return apps.slice(0, 6)
    }

    const lowerKeyword = keyword.toLowerCase()

    const matchedApps = apps
      .filter((app) => app.title.toLowerCase().includes(lowerKeyword))
      .slice(0, 6)

    return matchedApps
  } catch (error) {
    console.error('Error getting Windows apps:', error)
    return []
  }
}
async function getLinuxApps(keyword: string): Promise<AppInfo[]> {
  try {
    const { stdout } = await execAsync('ls /usr/share/applications/*.desktop')
    const desktopFiles = stdout.split('\n').filter(Boolean)
    let idCounter = 0 // 初始化计数器
    const apps: AppInfo[] = await Promise.all(
      desktopFiles.map(async (file) => {
        const { stdout: nameStdout } = await execAsync(`grep -m 1 "^Name=" "${file}"`)
        const { stdout: execStdout } = await execAsync(`grep -m 1 "^Exec=" "${file}"`)

        return {
          id: ++idCounter,
          title: nameStdout.replace('Name=', '').trim(),
          exec: execStdout.replace('Exec=', '').trim(),
          isApp: true
        }
      })
    )

    const validApps = apps.filter((app) => app.title && app.exec).slice(0, 6)

    if (!keyword || keyword.trim() === '') {
      return validApps.slice(0, 6)
    }

    const lowerKeyword = keyword.toLowerCase()

    const matchedApps = validApps.filter((app) => app.title.toLowerCase().includes(lowerKeyword))
    return matchedApps
  } catch (error) {
    return []
  }
}
export async function getInstalledApps(keyword: string): Promise<AppInfo[]> {
  const platform = os.platform()
  switch (platform) {
    case 'darwin':
      return getMacApps(keyword)
    case 'win32':
      return getWindowsApps(keyword)
    case 'linux':
      return getLinuxApps(keyword)
    default:
      console.warn(`Platform ${platform} is not supported for app listing.`)
      return []
  }
}

export function getPlatform(): string {
  return os.platform()
}

export async function launchApp(exec: string): Promise<void> {
  try {
    await execAsync(exec)
  } catch (error) {
    console.error('Error launching app:', error)
    throw error
  }
}

export async function getProcessList(keyword: string) {
  return new Promise((resolve, reject) => {
    let command
    let parser: (line: string) => { title: string; id: string; isProcess: boolean }
    switch (process.platform) {
      case 'win32':
        command = 'tasklist /fo csv /nh'
        parser = (line) => {
          const [title, id] = line.split(',').map((item) => item.replace(/"/g, ''))
          return { title, id, isProcess: true }
        }
        break
      case 'darwin':
        command = 'ps -axco pid,comm'
        parser = (line) => {
          const [id, title] = line.trim().split(/\s+/)
          return { title, id, isProcess: true }
        }
        break
      case 'linux':
        command = 'ps -eo pid,comm --no-headers'
        parser = (line) => {
          const [id, title] = line.trim().split(/\s+/)
          return { title, id, isProcess: true }
        }
        break
      default:
        reject('Unsupported operating system')
        return
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`)
        return
      }
      if (stderr) {
        reject(`Error: ${stderr}`)
        return
      }

      const processes = stdout
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map(parser)
        .filter((process) => process.title.toLowerCase().includes(keyword.toLowerCase()))

      resolve(processes)
    })
  })
}

export async function closeProcess(processName: string) {
  return new Promise((resolve, reject) => {
    let command
    switch (process.platform) {
      case 'win32':
        command = `taskkill /F /IM "${processName}"`
        break
      case 'darwin':
      case 'linux':
        command = `pkill "${processName}"`
        break
      default:
        reject('Unsupported operating system')
        return
    }

    exec(command, (error) => {
      if (error) {
        reject(`Error closing ${processName}: ${error.message}`)
        return
      }
      resolve(`${processName} closed successfully`)
    })
  })
}
