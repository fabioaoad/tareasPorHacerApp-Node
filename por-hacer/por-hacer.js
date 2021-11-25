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
    getListado

}