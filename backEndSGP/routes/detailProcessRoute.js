const express = require('express');
const detailProcessController = require('../controller/detailProcessControler');

const router = express.Router();

router.post('/createDetailProcess', detailProcessController.createDetailProcess);
router.get('/getDetailProcessesForProcess/:process_id', detailProcessController.getDetailProcessesForProcess);
router.put('/updateDetailProcess/:id_detailProcess', detailProcessController.updateDetailProcess);
router.delete('/deleteDetailProcess/:id_detailProcess', detailProcessController.deleteDetailProcess);


module.exports = router;