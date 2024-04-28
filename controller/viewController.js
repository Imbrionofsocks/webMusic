const express = require('express');
const router = express.Router();
const serviceUser = require("../service/usersService");
const serviceSong = require("../service/songService");
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file')

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

    static async addNewSong(name, author, file){
        const check = await serviceSong.addSong(name, author, file)
        return check
    }
    static async selectOneSong(song_id){
        const song= await serviceSong.getSongById(song_id)
        return song
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
    if(check){
        if(check.dataValues.password===User.password){
            result=true
        }else{
            result=false
        }
    }else{
        result=false
    }

    res.send(JSON.stringify({result}));

})

router.post('/adminPage.html',upload, async (req, res) => {
    console.log("Запрос Post на /adminPage.html");
    const Song = req.file;
    console.log(Song);


    const check = await serverFunction.addNewSong(req.body.track,req.body.author,Song.buffer)
    console.log(check)
    res.send();

})

module.exports = router;