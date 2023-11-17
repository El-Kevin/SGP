const ProcessModel = require('../models/processModel');
const controller = {
    home: function(req, res) {
        return res.status(200).send({
          message: 'Soy la home'
        });
    },
    createProcess: function(req, res) {
        const { nombre_proceso, fecha_inicio, anio_proceso, estado_proceso, etapa_proceso, fecha_fin } = req.body;
        return ProcessModel.create({
          nombre_proceso,
          fecha_inicio,
          anio_proceso,
          estado_proceso,
          etapa_proceso,
          fecha_fin
        })
          .then(newProcess => {
            if (!newProcess) {
              return res.status(404).send({ message: 'No se ha guardado el proyecto' });
            }
            return res.status(200).send({ project: newProcess });
          })
          .catch(err => {
            return res.status(500).send({ message: 'Error al guardar el proyecto', error: err });
          });
    },
    getProcessWithYear: function(req, res){
        const anio = req.params.anio; // Obtener el año desde los parámetros de la URL
        ProcessModel.findAll({
            where: {
                anio_proceso: parseInt(anio) // Buscar proceso por el año (asegúrate de convertirlo a entero si es una cadena)
            }
        })
        .then(process => {
            if (!process) {
                return res.status(404).send({ message: 'Proceso no encontrado' });
            }
            return res.status(200).send({ process });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Error al buscar el proceso', error: err });
        });
    },
    getProcessAll: function(req, res){
        ProcessModel.findAll()
        .then(process => {
            if (!process) {
                return res.status(404).send({ message: 'Proceso no encontrado' });
            }
            return res.status(200).send({ process });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Error al buscar el proceso', error: err });
        });
    },
    
    updateProcess: function(req, res) {
        const procesoId = req.params.id; // Obtener el ID del proceso desde los parámetros de la URL
        const { nombre_proceso, fecha_inicio, anio_proceso, estado_proceso, etapa_proceso, fecha_fin } = req.body;

        ProcessModel.update({
            nombre_proceso,
            fecha_inicio,
            anio_proceso,
            estado_proceso,
            etapa_proceso,
            fecha_fin
        }, {
            where: {
                id: procesoId // Actualizar el proceso por su ID
            }
        })
        .then(rowsUpdated => {
            if (rowsUpdated[0] === 0) {
                return res.status(404).send({ message: 'No se encontró ningún proceso para actualizar' });
            }
            return res.status(200).send({ message: 'Proceso actualizado correctamente' });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Error al actualizar el proceso', error: err });
        });
    },

    deleteProcess: function(req, res){
        const procesoId = req.params.id; // Obtener el ID del proceso desde los parámetros de la URL
        ProcessModel.destroy({
            where: {
                id: procesoId // Eliminar el proceso por su ID
            }
        })
        .then(rowsDeleted => {
            if (rowsDeleted === 0) {
                return res.status(404).send({ message: 'No se encontró ningún proceso para eliminar' });
            }
            return res.status(200).send({ message: 'Proceso eliminado correctamente' });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Error al eliminar el proceso', error: err });
        });
    }    
}
module.exports = controller;