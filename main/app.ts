import { BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';

// main class
export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static createWindow() {
    	// Create the browser window.
    	Main.mainWindow = new BrowserWindow({width: 800, height: 600})

    	// and load the index.html of the app.
    	Main.mainWindow.loadURL(format({
    		pathname: join(__dirname, '../app/index.html'),
    		protocol: 'file:',
    		slashes: true
    	}))

        // Open DevTools
        Main.mainWindow.webContents.openDevTools()

    	// Emitted when the window is closed.
    	Main.mainWindow.on('closed', Main.onClose);
    }

    private static onClose(){
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
        Main.mainWindow = null;
    }

    private static onWindowAllClosed() {
    	// On OS X it is common for applications and their menu bar
    	// to stay active until the user quits explicitly with Cmd + Q
    	if (process.platform !== 'darwin') {
    		Main.application.quit();
    	}
    }

    private static onActivate(){
    	// On OS X it's common to re-create a window in the app when the
    	// dock icon is clicked and there are no other windows open.
    	if (Main.mainWindow === null) {
    		Main.createWindow()
    	}
    }

    static main(
        app: Electron.App,
        browserWindow: typeof BrowserWindow){
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class1 has no dependencies.  This
        // makes the code easier to write tests for

        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('ready', Main.createWindow);
        Main.application.on('activate', Main.onActivate);
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
    }
}
