const express = require('express')

const producto = require ('./contenedor')

const app = express() 

const PORT = process.env.PORT  || 8080 

app.get('/productos',(req,res)=>{
    res.send(producto.getAll)
})

app.get('/productosRandom',(req,res)=>{
    res.send(producto.ranProd)
})


app.listen(PORT, () =>{
    console.log(`Escuchando al puerto ${PORT}`)
})