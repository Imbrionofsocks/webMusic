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
    static async getPlaylistData(currentId) {
        return servicePlaylist.getPlaylistById(currentId)

    }
}

router.get('/adminPage',(req,res)=>{
    res.sendFile('./adminPage.html', { root: './out' })
})
router.get('/mainPage',(req,res)=>{
    res.sendFile('./mainPage.html', { root: './out' })
})
router.get('/regPage',(req,res)=>{
    res.sendFile('./regPage.html', { root: './out' })
})
router.get('/authPage',(req,res)=>{
    res.sendFile('./authPage.html', { root: './out' })
})

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

router.post('/adminPage', upload, async (req, res) => {
    console.log("Запрос Post на /adminPage");
    const Song = req.file;
    console.log(Song);


    const check = await serverFunction.addNewSong(req.body.track, req.body.author, Song.buffer)
    console.log(check)

    res.sendFile('./adminPage.html', { root: './out' })

})

router.post('/selectplaylist', upload, async (req, res) => {
    console.log("Запрос Post на /selectplaylist");
    const playlist = req.body;
    console.log(playlist);

    const playlistData= await serverFunction.getPlaylistData(playlist.id)

    let allSongs = await serverFunction.allSongsInPlaylist(playlist.id)
    let arraySongId = [];

    allSongs.forEach(function (element) {
        arraySongId[arraySongId.length] = element.song_id
    })

    let tracks=[];
    for (const element of arraySongId) {
        let Song = await serviceSong.getSongById(element)
        tracks[tracks.length] = {
            song_id: element,
            name: Song.name,
            author: Song.author
        }
    }

    const result= {
        playlist_id:playlistData.playlist_id,
        playlist_name: playlistData.playlist_name,
        playlist_image: playlistData.playlist_image,
        tracks: tracks
    }

    console.log(result)
    res.send(JSON.stringify(result));

})

router.post('/selectSong', upload, async (req, res) => {
    console.log("Запрос Post на /selectSong");
    const Song = req.body;
    console.log(Song);

    const currentSong= await serverFunction.selectOneSong(Song.song_id)
    console.log(currentSong)

    const result = {
        song_id: currentSong.song_id,
        name: currentSong.name,
        author: currentSong.author,
        src: currentSong.file
    }

    console.log(result)
    res.send(currentSong.file);

})

router.get('/selectSong/:fileid', async (req, res) => {
    console.log("Запрос Post на /selectSong");
    const fileId= req.params['fileid']
    console.log(fileId);

    const currentSong= await serverFunction.selectOneSong(fileId)
    console.log(currentSong)


    res.send(currentSong.file);

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