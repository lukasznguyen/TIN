const OrderRepository = require('../repository/sequelize/OrderRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');
const ServiceTechnicianRepository = require('../repository/sequelize/ServiceTechnicianRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(myOrders => {
            res.render('pages/orders/orders-list', {
                myOrders: myOrders,
                navLocation: 'orders'
            });
        });
}

exports.showAddOrderForm = (req, res, next) => {
    let allClients, allServiceTechnicians;
    ClientRepository.getClients()
        .then(myClients => {
            allClients = myClients;
            return ServiceTechnicianRepository.getServiceTechnicians();
        })
        .then(myServiceTechnicians => {
            allServiceTechnicians = myServiceTechnicians;
            res.render('pages/orders/orders-form', {
                myOrder: {},
                formMode: 'createNew',
                allClients: allClients,
                allServiceTechnicians: allServiceTechnicians,
                pageTitle: 'Nowe zlecenie',
                btnLabel: 'Dodaj zlecenie',
                formAction: '/orders/add',
                navLocation: 'orders',
                validationErrors: []
            });
        })
}

exports.showEditOrderForm = (req, res, next) => {
    const orderId = req.params.orderId;
    let allClients, allServiceTechnicians;
    ClientRepository.getClients()
        .then(myClients => {
            allClients = myClients;
        });

    ServiceTechnicianRepository.getServiceTechnicians()
        .then(myServiceTechnicians => {
            allServiceTechnicians = myServiceTechnicians;
        });

    OrderRepository.getOrderById(orderId)
        .then(myOrder => {
            res.render('pages/orders/orders-form', {
                myOrder: myOrder,
                allClients: allClients,
                allServiceTechnicians: allServiceTechnicians,
                formMode: 'edit',
                pageTitle: 'Edycja zlecenia',
                btnLabel: 'Edytuj zlecenie',
                formAction: '/orders/edit',
                navLocation: 'orders',
                validationErrors: []
            });
        });
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.getOrderById(orderId)
        .then(myOrder => {
            res.render('pages/orders/orders-form', {
                myOrder: myOrder,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zlecenia',
                formAction: '',
                navLocation: 'orders',
                validationErrors: []
            });
        });
}

exports.addOrder = (req, res, next) => {
    const orderData = { ...req.body };
    OrderRepository.createOrder(orderData)
        .then( result => {
            res.redirect('/orders');
        })
        .catch(err => {
            let allClients;
            let allServiceTechnicians;

            ClientRepository.getClients()
                .then(myClients => {
                    allClients = myClients;
                    return ServiceTechnicianRepository.getServiceTechnicians();
                }).then(myServiceTechnicians => {
                allServiceTechnicians = myServiceTechnicians;
                res.render('pages/orders/orders-form', {
                    myOrder: orderData,
                    formMode: 'createNew',
                    allClients: allClients,
                    allServiceTechnicians: allServiceTechnicians,
                    pageTitle: 'Nowe zlecenie',
                    btnLabel: 'Dodaj zlecenie',
                    formAction: '/orders/add',
                    navLocation: 'orders',
                    validationErrors: err.errors
                });
            });
        });
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.body._id;
    const orderData = { ...req.body };
    OrderRepository.updateOrder(orderId, orderData)
        .then( result => {
            res.redirect('/orders');
        })
        .catch(err => {
            let allClients;
            let allServiceTechnicians;

            ClientRepository.getClients()
                .then(myClients => {
                    allClients = myClients;
                    return ServiceTechnicianRepository.getServiceTechnicians();
                }).then(myServiceTechnicians => {
                allServiceTechnicians = myServiceTechnicians;
                res.render('pages/orders/orders-form', {
                    myOrder: orderData,
                    allClients: allClients,
                    allServiceTechnicians: allServiceTechnicians,
                    formMode: 'edit',
                    pageTitle: 'Edycja zlecenia',
                    btnLabel: 'Edytuj zlecenie',
                    formAction: '/orders/edit',
                    navLocation: 'orders',
                    validationErrors: err.errors
                });
            });

        });
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
        .then( () => {
            res.redirect('/orders');
        });
};