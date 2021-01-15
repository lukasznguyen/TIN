const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(myClients => {
            res.render('pages/client/client-list', {
                myClients: myClients,
                navLocation: 'client'
            });
        });
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/client-form', {
        myClient: {},
        formMode: 'createNew',
        pageTitle: 'Nowy klient',
        btnLabel: 'Dodaj klienta',
        formAction: '/clients/add',
        navLocation: 'client',
        validationErrors: []
    });
}

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(myClient => {
            res.render('pages/client/client-form', {
                myClient: myClient,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: []
            });
        });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(myClient => {
            res.render('pages/client/client-form', {
                myClient: myClient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'client',
                validationErrors: []
            });
        });
}

exports.addClient = (req, res, next) => {
    const clientData = { ...req.body };
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch(err => {
            res.render('pages/client/client-form', {
                myClient: clientData,
                formMode: 'createNew',
                pageTitle: 'Nowy klient',
                btnLabel: 'Dodaj klienta',
                formAction: '/clients/add',
                navLocation: 'client',
                validationErrors: err.errors
            });
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = { ...req.body };
    ClientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch(err => {
            res.render('pages/client/client-form', {
                myClient: clientData,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: err.errors
            });
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients');
        });
};