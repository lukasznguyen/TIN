const Sequelize = require('sequelize');

const Client = require("../../model/sequelize/Client");
const Order = require("../../model/sequelize/Order");
const ServiceTechnician = require("../../model/sequelize/ServiceTechnician");

exports.getOrders = () => {
    return Order.findAll({include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model: ServiceTechnician,
                as: 'serviceTechnician'
            }]
    });
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId, {include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model: ServiceTechnician,
                as: 'serviceTechnician'
            }]
    });
};

exports.createOrder = (data) => {

    return Order.create({
        client_id: data.client_id,
        serviceTechnician_id: data.serviceTechnician_id,
        description: data.description,
        dateOrder: data.dateOrder,
        cost: data.cost || null
    });
};

exports.updateOrder = (orderId, data) => {
    data.cost = data.cost || null;
    return Order.update(data, {where: {_id: orderId }});
}

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: { _id: orderId }
    });
}

exports.deleteManyOrders = (ordersIds) => {
    return Order.find({ _id: { [Sequelize.Op.in]: ordersIds }})
}