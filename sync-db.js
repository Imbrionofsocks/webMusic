const sequelize = require('./config/database');
const Users = require('./models/Users');
const Song = require('./models/Song');
const Playlist = require('./models/Playlists');
const PlaylistContent = require('./models/PlaylistContent');
const serviceUser = require("./service/usersService");
const serviceSong = require("./service/songService");
const servicePlaylist = require("./service/playlistService");
const servicePlaylistContent = require("./service/playlistContentService");

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
        user_id: '1'
    },
        {
            playlist_name: 'ДОРА',
            user_id: '1'
        },
        {
            playlist_name: 'ПИРАТ',
            user_id: '1'
        },
        {
            playlist_name: 'SHAMAN',
            user_id: '1'
        }
    ];

    return playlists;
}

async function generatePlaylistContent() {

    const allSongs = serviceSong.getAllSongs()
    for (let element of allSongs) {
        if(element.author="Maksim"){
            await servicePlaylistContent.addSongInPlaylistContent('1',element.song_id)
        }
        if(element.author="Дора"){
            await servicePlaylistContent.addSongInPlaylistContent('2',element.song_id)
        }
        if(element.author="Пират"){
            await servicePlaylistContent.addSongInPlaylistContent('3',element.song_id)
        }
        if(element.author="Shaman"){
            await servicePlaylistContent.addSongInPlaylistContent('4',element.song_id)
        }

    }
}


async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
        const User= await generateAdmin()
        await serviceUser.addTask(User.email, User.password)
        const playlists= await generatePlaylist()
        for (let element of playlists) {
            await servicePlaylist.addPlaylist(element.playlist_name,element.user_id)
        }
        await generatePlaylistContent()
    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        process.exit();
    }
}

syncDatabase();