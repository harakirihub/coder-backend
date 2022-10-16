const express = require('express')
const Contenedor = require('./files/contenedor')
const contenedor = new Contenedor('./productos.txt')
productos = []
const generalRoutes = require ('./routes/index.js')
const app = express() 

app.set('views', __dirname + '/views')
app.set('view engine','ejs')

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',generalRoutes)

const PORT = process.env.PORT  || 8080 

app.listen(PORT, () =>{
    console.log(`Escuchando al puerto ${PORT}`)})
    .on('error',(error)=> console.log(error))

