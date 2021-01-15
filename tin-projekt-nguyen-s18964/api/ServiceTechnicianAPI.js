const ServiceTechnician = require('../repository/sequelize/ServiceTechnicianRepository');

exports.getServiceTechnicians = (req, res, next) => {
    ServiceTechnician.getServiceTechnicians()
        .then(serviceTechnicians => {
            res.status(200).json(serviceTechnicians);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getServiceTechnicianById = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    ServiceTechnician.getServiceTechnicianById(serviceTechnicianId)
        .then(serviceTechnician => {
            if(!serviceTechnician) {
                res.status(404).json({
                    message: 'Service technician with id: '+serviceTechnicianId+' not found'
                })
            } else {
                res.status(200).json(serviceTechnician);
            }
        });
};

exports.createServiceTechnician = (req, res, next) => {
    ServiceTechnician.createServiceTechnician(req.body)
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

exports.updateServiceTechnician = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    ServiceTechnician.updateServiceTechnician(serviceTechnicianId, req.body)
        .then(result => {
            res.status(200).json({message: 'Service technician updated!', serviceTechnician: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteServiceTechnician = (req, res, next) => {
    const serviceTechnicianId = req.params.serviceTechnicianId;
    ServiceTechnician.deleteServiceTechnician(serviceTechnicianId)
        .then(result => {
            res.status(200).json({message: 'Removed service technician', serviceTechnician: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};