const express = require('express');
const router = express.Router();

const serviceTechnicianController = require('../controllers/serviceTechnicianController');

router.get('/', serviceTechnicianController.showServiceTechnicianList);
router.get('/add', serviceTechnicianController.showAddServiceTechnicianForm);
router.get('/edit/:serviceTechnicianId', serviceTechnicianController.showEditServiceTechnicianForm);
router.get('/details/:serviceTechnicianId', serviceTechnicianController.showServiceTechnicianDetails);

router.post('/add', serviceTechnicianController.addServiceTechnician);
router.post('/edit', serviceTechnicianController.updateServiceTechnician);
router.get('/delete/:serviceTechnicianId', serviceTechnicianController.deleteServiceTechnician);

module.exports = router;