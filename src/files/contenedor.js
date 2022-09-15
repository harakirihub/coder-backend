const fs =require('fs')

class Contenedor {
    constructor(file){
        this.file = file
        this.products = []
    }

save = async (product) => { 
    try{
        const id = this.products.length > 0 ? product.id =
        this.products.length + 1 : product.id = 1       
        this.products.push(product)
        await fs.promises.writeFile
        (`./${this.file}`, JSON.stringify(this.products)) 
        console.log('archivo creado')           
        return id
   }catch{
        return console.log('hubo un error')
    }        
}

getById = (id) => {
    const prodId = this.products.find(product => {
        return product.id === id})
        if(prodId){ return (prodId) 
        return prodId
    }else{
        return null
    }
}

getAll = () => {
    const allOfThem = this.products.map(product => product)
    return(allOfThem)
}

deleteById = (id) => {
    const delProdId = this.products.filter(product => {
        return product.id !== id
    })
    if(delProdId){            
        fs.promises.writeFile
        (`./${this.file}`, JSON.stringify(delProdId))
        .then(data => { return (this.products)} )            
    }    
}

deleteAll = () => {
    fs.unlinkSync(this.file)
}

ranProd = () => {
    const rand = Math.floor(Math.random() * this.products.length)
    return this.getById(rand)
}

}

const producto = new Contenedor('./productos.txt')

producto.save({title:'whiskas', price:'235', url:'https://www.whiskas.com.ar/wp-content/uploads/2020/09/Hogaren%CC%83os-Adulto-e1581093305603.jpg'})
producto.save({title:'Pedigree', price:'350', url:'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/042/807/products/cpcsink1-9a659b4d0241a5904915734748642429-640-0.png'})
producto.save({title:'Royal Canin', price: '400', url:'https://cdn.royalcanin-weshare-online.io/1j8-73ABRYZmsWpck2u6/v9/ar-l-producto-mini-adult-size-health-nutrition-seco'})

// producto.ranProd()
// producto.getById(1)
// producto.getAll()
// producto.deleteAll()
// producto.deleteById(2)

module.exports = { Contenedor }