const { Router }= require('express')
const router = Router()
const fs = require ('fs')
const dataValidation = require('../middlewares/index.js')
const { getAll, ranProd, Contenedor } = require ('../files/contenedor.js')

const productsArray = []

let readProductFile = async() =>{
    try{ 
        const productsFile = await 
        fs.promises.readFile('products.txt','utf-8')
        productsArray =JSON.parse(productsFile)
    }
    catch(error){

    }
}



router.get('/',(req,res)=>{
    res.sendFile(process.cwd() +'/files/index.html')
})

router.post('/', async (req, res) => {
    const { body } = req
    try{
        await readProductFile()
        let id = productsArray.length !== 0
        ? productsArray[productsArray.length -1 ].id +1
        : 1
        productsArray.push({...body, id })
        await fs.promises.writeFile('products.txt',JSON.stringify(productsArray))
        res.status(200).json({mensaje:'Producto agregado con exito',products:productosArray})
    }catch (error){
        res.status(400).json(error)
    }

})


router.get('/api/productos', getAll)

router.get('/api/productosRandom', ranProd)



module.exports = router