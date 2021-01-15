const Sequelize = require('sequelize');

const Client = require("../../model/sequelize/Client");
const Order = require("../../model/sequelize/Order");
const ServiceTechnician = require("../../model/sequelize/ServiceTechnician");

exports.getServiceTechnicians = () => {
    return ServiceTechnician.findAll();
};

exports.getServiceTechnicianById = (serviceTechnicianId) => {
    return ServiceTechnician.findByPk(serviceTechnicianId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        });
};

exports.createServiceTechnician = (newServiceTechnicianData) => {
    return ServiceTechnician.create({
        firstName: newServiceTechnicianData.firstName,
        lastName: newServiceTechnicianData.lastName,
        specialization: newServiceTechnicianData.specialization,
        dateHire: newServiceTechnicianData.dateHire
    });
};

exports.updateServiceTechnician = (serviceTechnicianId, serviceTechnicianData) => {
    const firstName = serviceTechnicianData.firstName;
    const lastName = serviceTechnicianData.lastName;
    const specialization = serviceTechnicianData.email;
    const dateHire = serviceTechnicianData.telefon;
    return ServiceTechnician.update(serviceTechnicianData, {where: {_id: serviceTechnicianId }});
};

exports.deleteServiceTechnician = (serviceTechnicianId) => {
    return ServiceTechnician.destroy({
        where: { _id: serviceTechnicianId }
    });
};