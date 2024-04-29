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
        allowNull: false
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        uniqueKeys: {
            Items_unique: {
                fields: ['playlist_id', 'song_id']
            }
        }
    });

module.exports = playlist_content;