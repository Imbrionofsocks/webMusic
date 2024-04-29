const express = require('express');
const router = express.Router();
const serviceUser = require("../service/usersService");
const serviceSong = require("../service/songService");
const servicePlaylist = require("../service/playlistService");
const servicePlaylistContent = require("../service/playlistContentService");
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage}).single('file')

class serverFunction {

    static async checkUser(email) {
        const findUser = await serviceUser.getTaskByEmail(email)
        return findUser
    }

    static async newUser(email, password) {
        return serviceUser.addTask(email, password).then(r => {
            return r
        }).catch(err => {
            return err
        })
    }

    static async addNewSong(name, author, file) {
        const check = await serviceSong.addSong(name, author, file)
        return check
    }

    static async selectOneSong(song_id) {
        const song = await serviceSong.getSongById(song_id)
        return song
    }

    static async allSongsInPlaylist(currentId) {
        return servicePlaylistContent.getAllSongsInPlaylist(currentId)

    }
    static async allPlaylistInUser(currentId) {
        return servicePlaylist.getAllPlaylistUser(currentId)

    }
}


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.use(express.static('./out'))

// define the home page route

router.post('/registration', async (req, res) => {
    console.log("Запрос Post на /registration");
    const User = req.body;
    console.log(User);

    const check = await serverFunction.newUser(User.email, User.password)
    console.log(check)
    res.send(JSON.stringify({check}));

})

router.post('/authorization', async (req, res) => {
    console.log("Запрос Post на /authorization");
    const User = req.body;
    console.log(User);
    let result;

    const check = await serverFunction.checkUser(User.email)
    console.log(check)
    if (check) {
        if (check.dataValues.password === User.password) {
            result = true
        } else {
            result = false
        }
    } else {
        result = false
    }

    res.send(JSON.stringify({result}));

})

router.post('/adminPage.html', upload, async (req, res) => {
    console.log("Запрос Post на /adminPage.html");
    const Song = req.file;
    console.log(Song);


    const check = await serverFunction.addNewSong(req.body.track, req.body.author, Song.buffer)
    console.log(check)
    res.send();

})

router.post('/selectplaylist', upload, async (req, res) => {
    console.log("Запрос Post на /selectplaylist");
    const playlist = req.body;
    console.log(playlist);

    let allSongs = serverFunction.allSongsInPlaylist(playlist.id)
    let arraySongId = [];

    allSongs.forEach(function (element) {
        arraySongId[arraySongId.length] = element.song_id
    })

    let result = [];
    arraySongId.forEach(function (element) {
        let Song = serviceSong.getSongById(element)
        result[result.length] = {
            song_id: element,
            name: Song.name,
            author: Song.author
        }
    })

    console.log(result)
    res.send();

})

router.post('/selectSong', upload, async (req, res) => {
    console.log("Запрос Post на /selectSong");
    const Song = req.body;
    console.log(Song);

    const currentSong= serverFunction.selectOneSong(Song.id)


    const result = {
        id: currentSong.song_id,
        name: currentSong.name,
        author: currentSong.author,
        src: currentSong.file
    }

    console.log(result)
    res.send();

})

router.post('/allPlaylistUser', upload, async (req, res) => {
    console.log("Запрос Post на /allPlaylistUser");
    const User = req.body;
    console.log(User);

    const allPlaylist= serverFunction.allPlaylistInUser(User.id)
    let result = [];
    allPlaylist.forEach(function (element) {
        result[result.length] = {
            playlist_id: element.playlist_id,
            playlist_name: element.playlist_name
        }
    })

    console.log(result)
    res.send();

})


module.exports = router;