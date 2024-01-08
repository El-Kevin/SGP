const express = require('express');
const ProcessController = require('../controller/processController');
const User = require('../controller/user');
const Token = require ('../controller/validate-token');
const router = express.Router();

router.post('/home', ProcessController.home);
router.post('/saveProcess', ProcessController.createProcess);
router.get('/getProcess/:anio', ProcessController.getProcessWithYear);
router.get('/getProcess', Token.validateToken ,ProcessController.getProcessAll);
router.delete('/deleteProcess/:id', ProcessController.deleteProcess);
router.put('/updateProcess/:id', ProcessController.updateProcess);

module.exports = router;
