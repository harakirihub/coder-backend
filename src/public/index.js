const socketClient = io()


const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('name')
const inputInfo = document.getElementById('info')
const lista = document.getElementById('lista')

formulario.onsubmit = (e) =>{
    e.preventDefault()
    const info = inputInfo.value
    const nombre = inputNombre.value
    const time = new Date().toDateString()
    const obj = {nombre, info, time}
    socketClient.emit('mensaje',obj)
    inputInfo.value = ''
}

socketClient.on('mensajesArray',mensajesArray=>{
    generarTexto(mensajesArray)
})

function generarTexto(mensajes){
    
    const inner = mensajes.map(mensaje=>{
        return (`<li class="list-group-item" > <b style="color:blue"> ${mensaje.nombre} </b> <p style="color:brown"> ${mensaje.time}</p>${mensaje.info}</li><br>`)
    }).join(' ')
    lista.innerHTML = inner
}

