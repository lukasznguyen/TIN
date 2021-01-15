const Order = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => {
    Order.getOrders()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrderById = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.getOrderById(orderId)
        .then(order => {
            if(!order) {
                res.status(404).json({
                    message: 'Order with id: '+orderId+' not found'
                })
            } else {
                res.status(200).json(order);
            }
        });
};

exports.createOrder = (req, res, next) => {
    Order.createOrder(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.updateOrder(orderId, req.body)
        .then(result => {
            res.status(200).json({message: 'Order updated!', order: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.deleteOrder(orderId)
        .then(result => {
            res.status(200).json({message: 'Removed order', order: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};