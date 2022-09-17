const fs =require('fs')

class Contenedor {
    constructor(file){
        this.file = file
    }

save = async (product) => { 
    try{
        const prods = await this.getAll()
        const id = prods.length > 0 ? product.id =
        prods.length + 1 : product.id = 1   
        const newProd = { ...product, id }    
        prods.push(newProd)
        await fs.promises.writeFile
        (this.file, JSON.stringify(prods)) 
        console.log('archivo creado')           
        return newProd
   }catch{
        return console.log('hubo un error')
    }        
}

getById = async (id) => {
    try{
    const prods = await this.getAll()
    const prodId = prods.find(product => {
        return product.id === id})
        if(prodId){ return (prodId) 
        return prodId
    }else{
        return null
    }
    
 }catch(error){
    console.log(error)
 }
}

getAll = async() => {
    try{
    const prods = await fs.promises.readFile(this.file)
    return JSON.parse(prods)
    } catch(error) {
    console.log(error)
}

}

deleteById = async (id) => {
    const prods = await this.getAll()
    const delProdId = await prods.filter(product => {
        return product.id !== id
    })
    if(delProdId){            
        fs.promises.writeFile
        (`./${this.file}`, JSON.stringify(delProdId))
        .then(data => { return (prods)} )            
    }    
} 

deleteAll = () => {
    fs.unlinkSync(this.file)
}

ranProd = async() => {
    try { 
    const prods = await this.getAll()    
    const rand = Math.floor(Math.random() * prods.length)
    return this.getById(rand)

    } catch(error){
    console.log(error)
    }
}

}

module.exports =  Contenedor 