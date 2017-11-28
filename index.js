const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;

// declare variable
let mainWindow;

// when the app is ready
app.on('ready', () => {
	// make new window
	mainWindow = new BrowserWindow({}); 
	// load window
	mainWindow.loadURL(`file://${__dirname}/index.html`); 
});

// watch for video:submit from mainWindow
ipcMain.on('video:submit', (event, path) => {
	// get video metadata
	ffmpeg.ffprobe(path, (err, metadata) => {
		// send metadata back to mainWindow
		mainWindow.webContents.send('video:metadata', metadata.format.duration);	
	});
}); 