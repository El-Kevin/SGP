const ProcessModel = require('../models/processModel');

const controller = {

    createProcess: function(req, res) {
        const { process_name, start_date, process_year, process_status, end_date, user_table_id } = req.body;
        return ProcessModel.create({
          process_name: process_name,
          start_date: start_date,
          process_year: process_year,
          process_status: process_status,
          end_date: end_date,
          user_table_id: user_table_id // Asegúrate de que user_table_id esté en el cuerpo de la solicitud
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
            process_year: parseInt(anio) // Buscar proceso por el año (asegúrate de convertirlo a entero si es una cadena)
          }
        })
        .then(processes => {
          if (!processes || processes.length === 0) {
            return res.status(404).send({ message: 'Proceso no encontrado' });
          }
          return res.status(200).send({ processes });
        })
        .catch(err => {
          return res.status(500).send({ message: 'Error al buscar el proceso', error: err });
        });
      },
      
      getProcessAll: function(req, res){
        
        ProcessModel.findAll()
          .then(processes => {
            
           /* if (!processes || processes.length === 0) {
              return res.status(404).send({ message: 'Proceso no encontrado' });
            }
            */
            return res.status(200).send({ processes });
          })
          .catch(err => {
            return res.status(500).send({ message: 'Error al buscar el proceso', error: err });
          });
      },
      
    
      updateProcess: function(req, res) {
        const procesoId = req.params.id; // Obtener el ID del proceso desde los parámetros de la URL
        const { process_name, start_date, process_year, process_status, end_date, user_table_id } = req.body;


        ProcessModel.update({
          process_name: process_name,
          start_date: start_date,
          process_year: process_year,
          process_status: process_status,
          end_date: end_date,
          user_table_id: user_table_id // Asegúrate de que user_table_id esté en el cuerpo de la solicitud
        }, {
          where: {
            id_process: procesoId // Actualizar el proceso por su ID
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
            id_process: procesoId // Eliminar el proceso por su ID actualizado (id_process)
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