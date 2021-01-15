const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const ServiceTechnician = require('../../model/sequelize/ServiceTechnician');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Client.hasMany(Order, {as: 'orders', foreignKey: {name: 'client_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Client, {as: 'client', foreignKey: {name: 'client_id', allowNull: false} } );
    ServiceTechnician.hasMany(Order, {as: 'orders', foreignKey: {name: 'serviceTechnician_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(ServiceTechnician, {as: 'serviceTechnician', foreignKey: {name: 'serviceTechnician_id', allowNull: false} });

    let allClients, allServiceTechnicians;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Client.findAll();
        })
        .then(clients => {
            if( !clients || clients.length == 0 ) {
                return Client.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@poczta1.com', telefon: '111222333'},
                    {firstName: 'Julia', lastName: 'Nowak', email: 'julia.nowak@poczta2.com', telefon: '123456789'},
                    {firstName: 'Adam', lastName: 'Lewandowski', email: 'adam.lewandowski@poczta3.com', telefon: '987654321'}
                ])
                    .then( () => {
                        return Client.findAll();
                    });
            } else {
                return clients;
            }
        })
        .then( clients => {
            allClients = clients;
            return ServiceTechnician.findAll();
        })
        .then( serviceTechnicians => {
            if( !serviceTechnicians || serviceTechnicians.length == 0 ) {
                return ServiceTechnician.bulkCreate([
                    {firstName: 'Adam', lastName: 'Adamowski', specialization: 'Telewizory', dateHire: '2020-10-01'},
                    {firstName: 'Karol', lastName: 'Karolowski', specialization: 'Telefony', dateHire: '2020-10-15'},
                    {firstName: 'Bartosz', lastName: 'Bartkowski', specialization: 'Pralki', dateHire: '2020-11-30'},
                ])
                    .then( () => {
                        return Client.findAll();
                    });
            } else {
                return serviceTechnicians;
            }
        })
        .then( serviceTechnicians => {
            allServiceTechnicians = serviceTechnicians;
            return Order.findAll();
        })
        .then( orders => {
            if( !orders || orders.length == 0 ) {
                return Order.bulkCreate([
                    {client_id: allClients[0]._id, serviceTechnician_id: allServiceTechnicians[0]._id, description: 'Telewizor stłuczony', dateOrder: '2020-10-10', cost: 800.00},
                    {client_id: allClients[0]._id, serviceTechnician_id: allServiceTechnicians[0]._id, description: 'Telewizor nie działa, wada fabryczna', dateOrder: '2020-11-05', cost: null},
                    {client_id: allClients[1]._id, serviceTechnician_id: allServiceTechnicians[1]._id, description: 'Telefon zalany sokiem', dateOrder: '2020-10-20', cost: null}
                ]);
            } else {
                return orders;
            }
        });
};