const { Router }= require('express')
const router = Router()
const fs = require ('fs')
const dataValidation = require('../middlewares/index.js')
const Contenedor = require('../files/contenedor.js')
const contenedor = new Contenedor('./productos.txt')
const productsArray = []

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
    res.sendFile(process.cwd() +'/files/index.html')
})

router.post('/', async (req, res) => {
    const { body } = req
    try{
        const product = await contenedor.save(body)
        res.json(product)
    }catch (error){
        res.status(400).json(error)
    }
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



module.exports = router