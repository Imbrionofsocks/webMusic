const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const song = sequelize.define('song', {
    song_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: DataTypes.BLOB("long"),
        allowNull: false
    }
});

module.exports = song;