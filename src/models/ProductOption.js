
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductOption = sequelize.define('ProductOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'product_options',
    timestamps: true
});

module.exports = ProductOption;
