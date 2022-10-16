const { Router }= require('express')
const router = Router()
const fs = require ('fs')
const dataValidation = require('../middlewares/index.js')
const Contenedor = require('../files/contenedor.js')
const contenedor = new Contenedor('./productos.txt')
const productsArray = []
const productos = []

let readProductFile = async() =>{
    try{ 
        const productsFile = await 
        fs.promises.readFile('products.txt','utf-8')
        productsArray =JSON.parse(productsFile)
    }
    catch(error){
    console.log(error)
    }
}

router.get('/',(req,res)=>{
    res.render('layouts/layoutejs',{productos})

})

router.get('/productos', async (req, res)=>{
    try{
        const prods = await contenedor.getAll()
        res.render('layouts/layoutContainer.ejs',{prods})
    }  catch(error){
        res.status(400).json(error)
    }
})

router.post('/productos', async (req, res) => {
    const { body } = req
    productos.push(body)
    contenedor.save(body)
    res.redirect('/')
    
}) 

router.get('/api/productos', async (req, res)=>{
    try{
        const prods = await contenedor.getAll()
        res.json(prods)
    }catch(error){
        res.status(400).json(error)
    }
})

router.get('/api/productosRandom', async (req, res)=>{
    try{
        const rdmProd = await contenedor.ranProd()
        res.json(rdmProd)
    }catch(error){
        res.status(400).json(error)
    }
})

router.get('/api/productos/:id', async (req, res)=>{
    const  { id }  = req.params
    try{
        const prodById = await contenedor.getById(id)
        res.json(prodById)

        console.log(contenedor.getById(2))

    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/api/productos', async (req, res)=>{
    const { body } = req
    try{
        const product = await contenedor.save(body)
        res.json(product)
    }catch (error){
        res.status(400).json(error)
    }
})

router.put('/api/productos/:id', async (req, res)=>{
    const  { id }  = req.params
    const { body } = req
    try{
        const putIt = await contenedor.save(body)
        res.json(putIt)
    }catch(error){
        res.status(400).json(error)
    }
})

router.delete('/api/productos/:id', async (req, res)=>{
    const  { id }  = req.params
    try{
        const dBID = await contenedor.deleteById(id)
        res.json(dBID)
    }catch(error){
        res.status(400).json(error)
    }
})


module.exports = router