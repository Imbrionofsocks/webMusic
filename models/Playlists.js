const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const playlists = sequelize.define('playlists', {
    playlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    playlist_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    playlist_image:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = playlists;