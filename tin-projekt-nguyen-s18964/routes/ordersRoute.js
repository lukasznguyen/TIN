const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.showOrderList);
router.get('/add', ordersController.showAddOrderForm);
router.get('/edit/:orderId', ordersController.showEditOrderForm);
router.get('/details/:orderId', ordersController.showOrderDetails);

router.post('/add', ordersController.addOrder);
router.post('/edit', ordersController.updateOrder);
router.get('/delete/:orderId', ordersController.deleteOrder);

module.exports = router;