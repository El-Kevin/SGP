const DetailProcessModel = require('../models/detailProcessModel');

const controller = {
  createDetailProcess: function(req, res) {
    const { elements_snt, stage_detail, notification_date, check_status, process_id } = req.body;
    console.log(req.body)
    return DetailProcessModel.create({
      elements_snt:elements_snt,
      stage_detail: stage_detail,
      notification_date: notification_date,
      check_status:check_status,
      process_id: process_id // Asegúrate de que process_id esté en el cuerpo de la solicitud
    })
    .then(newDetailProcess => {
      if (!newDetailProcess) {
        return res.status(404).send({ message: 'No se ha guardado el detalle del proceso' });
      }
      return res.status(200).send({ detailProcess: newDetailProcess });
    })
    
  },

  getDetailProcessesForProcess: function(req, res) {
    const { process_id } = req.params; // Obtener el ID del proceso desde los parámetros de la URL
    DetailProcessModel.findAll({
      where: {
        process_id: process_id // Buscar detalles del proceso por su ID de proceso
      }
    })
    .then(detailProcesses => {

      return res.status(200).send({ detailProcesses });
    })
    .catch(err => {
      return res.status(500).send({ message: 'Error al buscar los detalles del proceso', error: err });
    });
  },
  updateDetailProcess: function(req, res) {
    const detailProcessId = req.params.id_detailProcess; // Obtener el ID del detalle del proceso desde los parámetros de la URL
    const { elements_snt, stage_detail, notification_date, check_status, process_id } = req.body;

    DetailProcessModel.update({
      elements_snt,
      stage_detail,
      notification_date,
      check_status,
      process_id // Asegúrate de que process_id esté en el cuerpo de la solicitud
    }, {
      where: {
        id_detail: detailProcessId // Actualizar el detalle del proceso por su ID
      }
    })
    .then(rowsUpdated => {
      if (rowsUpdated[0] === 0) {
        return res.status(404).send({ message: 'No se encontró ningún detalle del proceso para actualizar' });
      }
      return res.status(200).send({ message: 'Detalle del proceso actualizado correctamente' });
    })
    .catch(err => {
      return res.status(500).send({ message: 'Error al actualizar el detalle del proceso', error: err });
    });
  },

  deleteDetailProcess: function(req, res){
    const detailProcessId = req.params.id_detailProcess; // Obtener el ID del detalle del proceso desde los parámetros de la URL
    DetailProcessModel.destroy({
      where: {
        id_detail: detailProcessId // Eliminar el proceso por su ID actualizado (id_process)
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
  // Otros métodos del controlador para actualizar y eliminar detalles del proceso pueden ser similares a los proporcionados para process_table
};

module.exports = controller;
