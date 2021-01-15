const ServiceTechnicianRepository = require('../repository/sequelize/ServiceTechnicianRepository');

exports.showServiceTechnicianList = (req, res, next) => {
    ServiceTechnicianRepository.getServiceTechnicians()
        .then(myServiceTechnicians => {
            res.render('pages/service_technician/service_technician-list', {
                myServiceTechnicians: myServiceTechnicians,
                navLocation: 'serviceTechnician'
            });
        });
}

exports.showAddServiceTechnicianForm = (req, res, next) => {
    res.render('pages/service_technician/service_technician-form', {
        myServiceTechnician: {},
        formMode: 'createNew',
        pageTitle: 'Nowy serwisant',
        btnLabel: 'Dodaj serwisanta',
        formAction: '/servicetechnicians/add',
        navLocation: 'serviceTechnician',
        validationErrors: []
    });
}

exports.showEditServiceTechnicianForm = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    ServiceTechnicianRepository.getServiceTechnicianById(serviceTechnicianId)
        .then(myServiceTechnician => {
            res.render('pages/service_technician/service_technician-form', {
                myServiceTechnician: myServiceTechnician,
                formMode: 'edit',
                pageTitle: 'Edycja serwisanta',
                btnLabel: 'Edytuj serwisanta',
                formAction: '/servicetechnicians/edit',
                navLocation: 'serviceTechnician',
                validationErrors: []
            });
        });
}

exports.showServiceTechnicianDetails = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    ServiceTechnicianRepository.getServiceTechnicianById(serviceTechnicianId)
        .then(myServiceTechnician => {
            res.render('pages/service_technician/service_technician-form', {
                myServiceTechnician: myServiceTechnician,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły serwisanta',
                formAction: '',
                navLocation: 'serviceTechnician',
                validationErrors: []
            });
        });
}

exports.addServiceTechnician = (req, res, next) => {
    const serviceTechnicianData = { ...req.body };
    ServiceTechnicianRepository.createServiceTechnician(serviceTechnicianData)
        .then( result => {
            res.redirect('/servicetechnicians');
        })
        .catch(err => {
            res.render('pages/service_technician/service_technician-form', {
                myServiceTechnician: serviceTechnicianData,
                formMode: 'createNew',
                pageTitle: 'Nowy serwisant',
                btnLabel: 'Dodaj serwisanta',
                formAction: '/servicetechnicians/add',
                navLocation: 'serviceTechnician',
                validationErrors: err.errors
            });
        });
};

exports.updateServiceTechnician = (req, res, next) => {
    const serviceTechnicianId = req.body._id;
    const serviceTechnicianData = { ...req.body };
    ServiceTechnicianRepository.updateServiceTechnician(serviceTechnicianId, serviceTechnicianData)
        .then( result => {
            res.redirect('/servicetechnicians');
        })
        .catch(err => {
            res.render('pages/service_technician/service_technician-form', {
                myServiceTechnician: serviceTechnicianData,
                formMode: 'edit',
                pageTitle: 'Edycja serwisanta',
                btnLabel: 'Edytuj serwisanta',
                formAction: '/servicetechnicians/edit',
                navLocation: 'serviceTechnician',
                validationErrors: err.errors
            });
        });
};

exports.deleteServiceTechnician = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    const tmp = req.params;
    ServiceTechnicianRepository.deleteServiceTechnician(serviceTechnicianId)
        .then( () => {
            res.redirect('/servicetechnicians');
        });
};