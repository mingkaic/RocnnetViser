/// <reference path="../typings/index.d.ts" />

import { BrowserWindow, globalShortcut } from 'electron';
import { join } from 'path';
import { format } from 'url';

// app class
export default class ElectronApp {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;
	static browserWindow;

	static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
		// we pass the Electron.App object and the Electron.BrowserWindow into this function
		// so this class1 has no dependencies.  This
		// makes the code easier to write tests for

		ElectronApp.browserWindow = browserWindow;
		ElectronApp.application = app;
		ElectronApp.application.on('ready', ElectronApp.createWindow);
		ElectronApp.application.on('activate', ElectronApp.onActivate);
		ElectronApp.application.on('will-quit', ElectronApp.onQuit);
		ElectronApp.application.on('window-all-closed', ElectronApp.onWindowAllClosed);
	}

	private static createWindow() {
		// create the browser window.
		ElectronApp.mainWindow = new BrowserWindow({width: 800, height: 600});

		// and load the index.html of the app.
		ElectronApp.mainWindow.loadURL(format({
			pathname: join(__dirname, './index.html'),
			protocol: 'file:',
			slashes: true
		}));

		// open DevTools
		ElectronApp.mainWindow.webContents.openDevTools();

		// emitted when the window is closed.
		ElectronApp.mainWindow.on('closed', ElectronApp.onClose);
	}

	private static onClose() {
		// dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		ElectronApp.mainWindow = null;
	}

	private static onWindowAllClosed() {
		// on OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			ElectronApp.application.quit();
		}
	}

	private static onActivate() {
		// on OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (ElectronApp.mainWindow === null) {
			ElectronApp.createWindow();
		}
	}

	private static onQuit() {
		// unregister all shortcuts.
		globalShortcut.unregisterAll();
	}
}
