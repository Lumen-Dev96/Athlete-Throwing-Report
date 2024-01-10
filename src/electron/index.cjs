const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
global.appDirname = __dirname

const winURL = path.resolve(__dirname, '../renderer/index.html')
function createWindow() {
  const win = new BrowserWindow({
    width: 1580,
    height: 888,
    icon: path.resolve(__dirname, './icon/logo.png'),
    frame: false,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, //  Boolean (可选) - 是否启用Node integration. 默认值为 false.
      contextIsolation: false, // Boolean (可选) - 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认值为 false.
      webviewTag: true // Boolean (可选) - 是否启用 <webview> tag标签. 默认值为 false.
    }
  })

  if (app.isPackaged) {
    win.loadURL(`file://${winURL}`) // 入口html
  } else {
    win.loadURL('http://localhost:5173') // 指向当前启动的web应用
    win.webContents.openDevTools() // 启动调试工具
  }

  win.on('ready-to-show', () => { win.show() })

  return win
}

app.on('ready', () => {
  // eslint-disable-next-line new-cap
  const mainWindow = new createWindow()
  ipcMain.on('toggle_dev_tools', (event, arg) => { // 开启tool
    mainWindow.webContents.toggleDevTools()
  })
})

app.on('quit', () => {
  app.releaseSingleInstanceLock()// 释放所有的单例锁
})

