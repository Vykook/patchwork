var Menu = require('electron').Menu
var dialog = require('electron').dialog
var nativeImage = require('electron').nativeImage
var pkg = require('../package')
var windows = require('./windows')

var isMac = (process.platform == 'darwin')

function showAbout(win) {
  dialog.showMessageBox(win, {
    title: 'About Patchwork',
    buttons: ['Close', 'License'],
    type: 'info',
    icon: nativeImage.createFromPath('ui/img/icon.png'),
    message: pkg.name + ' v' + pkg.version,
    detail: pkg.description + '\n\n' +
      'Copyright © 2015-2016 Secure Scuttlebutt Consortium\n\n' +
      'http://ssbc.github.io/patchwork/'
  }, function (btn) {
    if (btn == 1)
      showLicense(win)
  })
}

function showLicense(win) {
  dialog.showMessageBox(win, {
    title: 'License',
    buttons: ['Close'],
    message: pkg.license,
    detail: 'This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.'
  })
}

module.exports = function (configOracle) {
  var template = [
    {
      label: 'Patchwork',
      submenu: [
        {
          label: 'About Patchwork',
          role: 'about',
          click: function (item, win) {
            showAbout(win)
          }
        },
      ].concat(isMac ? [
        {
          type: 'separator'
        },
        {
          label: 'Hide Patchwork',
          accelerator: 'Command+H',
          selector: 'hide:',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Option+Command+H',
          selector: 'hideOtherApplications:',
        role: 'hideothers'
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:',
          role: 'unhide'
        },
      ] : [], [
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: function (item, win) {
            require('electron').app.quit()
          }
        }
      ])
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
        {
          type: 'separator'
        },
        {
          label: 'Find...',
          accelerator: 'CmdOrCtrl+F',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.emit("focus:find")')
          }
        },
        {
          label: 'Find Previous',
          accelerator: 'CmdOrCtrl+Shift+G',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.emit("find:previous")')
          }
        },
        {
          label: 'Find Next',
          accelerator: 'CmdOrCtrl+G',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.emit("find:next")')
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+=',
          click: function (item, win) {
            win.webContents.executeJavaScript('window.zoom.zoomIn()')
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: function (item, win) {
            win.webContents.executeJavaScript('window.zoom.zoomOut()')
          }
        },
        {
          label: 'Normal Size',
          accelerator: 'CmdOrCtrl+0',
          click: function (item, win) {
            win.webContents.executeJavaScript('window.zoom.zoomReset()')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Toggle DevTools',
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: function (item, win) { 
            win.toggleDevTools()
          }
        }
      ]
    },
    {
      label: 'Go',
      submenu: [
        {
          label: 'Back',
          accelerator: 'Alt+Left',
          click: function (item, win) {
            win.webContents.goBack()
          }
        },
        {
          label: 'Forward',
          accelerator: 'Alt+Right',
          click: function (item, win) {
            win.webContents.goForward()
          }
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function (item, win) {
            win.reload()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Feed',
          accelerator: 'CmdOrCtrl+1',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.history.pushState(null, "")')
          }
        },
        {
          label: 'Inbox',
          accelerator: 'CmdOrCtrl+2',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.history.pushState(null, "inbox")')
          }
        },
        {
          label: 'Contacts',
          accelerator: 'CmdOrCtrl+3',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.history.pushState(null, "profile")')
          }
        },
        {
          label: 'Network Status',
          accelerator: 'CmdOrCtrl+4',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.history.pushState(null, "sync")')
          }
        },
        {
          label: 'Data Log',
          accelerator: 'CmdOrCtrl+5',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.history.pushState(null, "data")')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Search',
          accelerator: 'CmdOrCtrl+K',
          click: function (item, win) {
            win.webContents.executeJavaScript('app.emit("focus:search")')
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'New Window',
          accelerator: 'CmdOrCtrl+N',
          click: function (item, win) {
            var newWindow = windows.create()
            newWindow.loadURL(configOracle.getLocalUrl())
          }
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          click: function (item, win) {
            win.close()
          }
        },
      ].concat(isMac ? [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:',
          role: 'front'
        }
      ] : [])
    }
  ]

  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}