const sequelize = require('./config/database');
const Users = require('./models/Users');
const Song = require('./models/Song');
const Playlist = require('./models/Playlists');
const PlaylistContent = require('./models/PlaylistContent');
const serviceUser = require("./service/usersService");
const serviceSong = require("./service/songService");
const servicePlaylist = require("./service/playlistService");
const servicePlaylistContent = require("./service/playlistContentService");
const {addSongInPlaylistContentByAuthor} = require("./utils");


async function generateAdmin() {

    const user = {
        email: 'Admin',
        password: 'password'
    };

    return user;
}

async function generatePlaylist() {

    const playlists = [{
        playlist_name: 'MAKSIM',
        user_id: '1',
        playlist_image: './src/pics/maksim.jpg'
    },
        {
            playlist_name: 'ДОРА',
            user_id: '1',
            playlist_image: './src/pics/Dora.jpg'
        },
        {
            playlist_name: 'ПИРАТ',
            user_id: '1',
            playlist_image: './src/pics/serega.jpg'
        },
        {
            playlist_name: 'SHAMAN',
            user_id: '1',
            playlist_image: './src/pics/shaman.jpg'
        }
    ];

    return playlists;
}

async function generatePlaylistContent() {

    const allSongs = await serviceSong.getAllSongs()
    console.log(allSongs)
    for (let element of allSongs) {
        await addSongInPlaylistContentByAuthor(element.dataValues)

    }
}


async function syncDatabase() {
    try {
        await sequelize.sync({alert:true});
        console.log('Database synchronized successfully.');
        const User= await generateAdmin()
        await serviceUser.addTask(User.email, User.password)
        const playlists= await generatePlaylist()
        for (let element of playlists) {
            await servicePlaylist.addPlaylist(element.playlist_name,element.user_id, element.playlist_image)
        }
        await generatePlaylistContent()
    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        process.exit();
    }
}

syncDatabase();

module.exports = {syncDatabase};