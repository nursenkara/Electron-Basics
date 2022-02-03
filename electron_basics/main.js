const electron = require("electron")
const url = require("url")
const path = require("path");
const { create } = require("domain");


const {app , BrowserWindow , Menu,ipcMain} = electron;

let mainWindow;

app.on('ready', () => {
    
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
          }
    });
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol : "file",
            slashes:true
        })
    );
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)


    ipcMain.on("key", (err,data) =>{
        console.log(data)
    })
    ipcMain.on("key:inputValue", (err,data) => {
        console.log(data);
    })
    //Yeni Pencere
    ipcMain.on("key:newWindow",()=>{
        createWindow();
    })
    mainWindow.on("close",()=>{
        app.quit()
    })
})
const mainMenuTemplate = [
    {
        label:"Dosya",
        submenu:[
            {
                label: "yeni todo"
            },
            {
                label:"Tümünü sil"
            },
            {
                label:"Çıkış",
                role:"quit"
            }

        ]
    }
]

function createWindow(){
    addWindow = new BrowserWindow({
        width:482,
        height:200,
        title:"Yeni Bir Pencere"
    })

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,"modal.html"),
        protocol: "file",
        slashes:true
    }))
    addWindow.on("close", () =>{
        addWindow = null;
    })
}