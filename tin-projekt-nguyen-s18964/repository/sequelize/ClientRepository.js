const Sequelize = require('sequelize');

const Client = require("../../model/sequelize/Client");
const Order = require("../../model/sequelize/Order");
const ServiceTechnician = require("../../model/sequelize/ServiceTechnician");

exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: ServiceTechnician,
                    as: 'serviceTechnician'
                }]
            }]
        });
};

exports.createClient = (newClientData) => {
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        email: newClientData.email,
        telefon: newClientData.telefon
    });
};

exports.updateClient = (clientId, clientData) => {
    const firstName = clientData.firstName;
    const lastName = clientData.lastName;
    const email = clientData.email;
    const telefon = clientData.telefon;
    return Client.update(clientData, {where: {_id: clientId }});
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: { _id: clientId }
    });
};

// exports.findByEmail = (email) => {
//     return Client.findOne({
//         where: {email: email}
//     });
// }