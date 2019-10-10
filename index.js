const { session, app, protocol, BrowserWindow } = require('electron')
const { join } = require('path')

protocol.registerSchemesAsPrivileged([{
  scheme: 'atom',
  privileges: {
    // The following setting
    // is causing the memoryleak
    standard: true
  }
}])

app.on('ready', () => {
  session.defaultSession.protocol.registerFileProtocol('atom', (request, callback) => {
    callback({
      path: join(__dirname, 'index.html')
    })
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(`atom://foobar`)
})
