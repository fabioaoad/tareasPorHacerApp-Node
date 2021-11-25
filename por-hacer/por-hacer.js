const fs = require('fs');



let listadoPorHacer = [];

const guardarBD = () =>{

    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data,(err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const crear = (descripcion) => {
    
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarBD();
    return porHacer;
}


const getListado = () => {

    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion , completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    });

    if ( index >= 0 ){
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        //console.log(listadoPorHacer);
    }
    catch (error) {
        listadoPorHacer = [];
    }

}


module.exports = {
    crear,
    getListado,
    actualizar

}