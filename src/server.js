const express = require('express')
const http = require('http')
const { Server: SocketServer } = require('socket.io')

const Contenedor = require('./files/contenedor')
const contenedor = new Contenedor('./productos.txt')
const chatHist = new Contenedor('./historial.txt') 

productos = []
const generalRoutes = require ('./routes/index.js')
const { string } = require('joi')

const app = express() 
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

app.set('views', __dirname + '/views')
app.set('view engine','ejs')

app.use(express.static("./public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',generalRoutes)

const PORT = process.env.PORT  || 8080 

httpServer.listen(PORT, () =>{
    console.log(`Escuchando al puerto ${PORT}`)})
    .on('error',(error)=> console.log(error))

const mensajes =[]
io.on('connection', (client) =>{
    console.log(`Usuario ${client.id} conectado`)
    
    client.on('mensaje', (obj) =>{
        mensajes.push(obj)
        io.sockets.emit('mensajesArray', mensajes)
        chatHist.save(obj)
        
    })

})