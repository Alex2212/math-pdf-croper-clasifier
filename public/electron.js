const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");
const child = require('child_process').execFile;
const db = require('electron-db');
// const storage = require('electron-json-storage');
// storage.setDataPath(app.getAppPath());
const location = path.join(app.getAppPath(), '');



db.createTable('data',location, (succ, msg) => {
  // succ - boolean, tells if the call is successful
  if (succ) {
    console.log(msg)
  } else {
    console.log('An error has occured. ' + msg)
  }
})


let mainWindow;




function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#fff',
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          preload: __dirname + '/preload.js'
        }
      });
    mainWindow.loadURL(isDev ? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
    
}


// app.whenReady().then(() => {
//     installExtension(REACT_DEVELOPER_TOOLS)
//         .then((name) => console.log(`Added Extension:  ${name}`))
//         .catch((err) => console.log('An error occurred: ', err));
// });


app.on("ready", createWindow);
   
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});


ipcMain.on('BrowsePDF',(e,data)=>{
    console.log(data.path);    
    var executablePath = __dirname + '/pdf2png.exe';
    var parameters = [(""+data.path)];
    
    child(executablePath, parameters, function(err, data) {
         console.log(err)
        //  console.log(data.toString());
         e.sender.send('RecievePNG',data);
    });
    
    

    
});

ipcMain.on('adauga',(e,data)=>{
    if (db.valid('data',location)) {
        db.insertTableContent('data',location, data, (succ, msg) => {		 
		if (succ) {
			console.log(msg);
			e.sender.send('newData',data);
          } else {
            console.log('An error has occured. ' + msg)
          }
        })
      }

    
});


const getAll = ()=>{
    return new Promise((resolve,reject)=>{
        if (db.valid('data',location)) {
            db.getAll('data',location, (succ, data) => {
              if (succ) {
                resolve(data);
              } else {
                console.log('An error has occured while fetching the data. !');
                reject('An error has occured while fetching the data. !');
              }
            })   
        } else reject('Invalid database and / or location !');
    });
    
}

ipcMain.handle('getAll', (e,args)=>{
    return getAll();
});

const deleteRecord = (id)=>{
    console.log('DELETE',id);
    return new Promise((resolve,reject)=>{
        if(db.valid('data',location)){
            db.deleteRow('data',location, {'id': id}, (succ, msg) => {
                if(succ){
                    resolve(`${id} record has been deleted succesfully !`);
                } else {
                    reject(`${id} record has not been deleted succesfully !1`);
                }
            });
    
        } else reject('Invalid database and / or location !')

    });
}


ipcMain.handle('delete', (e,id)=>{
    return deleteRecord(id);
});


const updateRecord = (data)=>{
  return new Promise((resolve,reject)=>{
      if(db.valid('data',location)){
        
        let where = {
          id: data.id
        };
        

        let set = {
        }

        if(data.an){set.an=data.an}
        if(data.sesiune){set.sesiune=data.sesiune}
        if(data.profil){set.profil=data.profil}
        if(data.subiect){set.subiect=data.subiect}
        if(data.capitol){set.capitol=data.capitol}



        db.updateRow('customers', where, set, (succ, msg) => {
              if(succ){
                  resolve(`${id} record has been updated succesfully !`);
              } else {
                  reject(`${id} record has not been updated succesfully !`);
              }
          });
  
      } else reject('Invalid database and / or location !')

  });
}


ipcMain.handle('update', (e,data)=>{
  return updateRecord(data);
});

// ipcMain.on('delete',(e,id)=>{
// 	console.log('id',id)
// 	if(db.valid('data',location)){
// 		db.deleteRow('data',location, {'id': id}, (succ, msg) => {
// 		if(succ){
// 			e.sender.send('delete','success');
// 		}
// 	});}
// });
