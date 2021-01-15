const express = require('express');
const router = express.Router();

const serviceTechnicianApiController = require('../../api/ServiceTechnicianAPI');

router.get('/', serviceTechnicianApiController.getServiceTechnicians);
router.get('/:serviceTechnicianId', serviceTechnicianApiController.getServiceTechnicianById);
router.post('/', serviceTechnicianApiController.createServiceTechnician);
router.put('/:serviceTechnicianId', serviceTechnicianApiController.updateServiceTechnician);
router.delete('/:serviceTechnicianId', serviceTechnicianApiController.deleteServiceTechnician);

module.exports = router;