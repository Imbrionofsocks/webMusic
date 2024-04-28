const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = users;