const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const playlist_content = sequelize.define('playlist_content', {
    playlist_content_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = playlist_content;