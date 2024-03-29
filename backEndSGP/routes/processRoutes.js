const express = require('express');
const ProcessController = require('../controller/processController');

const router = express.Router();

router.post('/saveProcess', ProcessController.createProcess);
router.get('/getProcess/:anio', ProcessController.getProcessWithYear);
router.get('/getProcess',ProcessController.getProcessAll);
router.delete('/deleteProcess/:id', ProcessController.deleteProcess);
router.put('/updateProcess/:id', ProcessController.updateProcess);

module.exports = router;
