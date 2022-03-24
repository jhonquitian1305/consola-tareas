const { inquirerMenu } = require('../helpers/inquirer');
const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {}
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)
        });

    }

    listarPendienteCompletadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if(completadas){
                if(completadoEn){
                    // Listar completadas
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`)
                }
            }else{
                if(!completadoEn){
                    // Listar pendientes
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }
        });
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

}



module.exports = Tareas;