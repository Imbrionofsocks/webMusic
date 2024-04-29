const servicePlaylistContent = require("./service/playlistContentService");


async function  addSongInPlaylistContentByAuthor ({author, song_id})
{
    if (author == "Maksim") {
        await servicePlaylistContent.addSongInPlaylistContent('1', song_id)
    }
    if (author == "Дора") {
        await servicePlaylistContent.addSongInPlaylistContent('2', song_id)
    }
    if (author == "Пират") {
        await servicePlaylistContent.addSongInPlaylistContent('3', song_id)
    }
    if (author == "Shaman") {
        await servicePlaylistContent.addSongInPlaylistContent('4', song_id)
    }
}

module.exports={addSongInPlaylistContentByAuthor}