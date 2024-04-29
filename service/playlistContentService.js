const PlaylistContent = require('../models/PlaylistContent');


class PlaylistContentService {
    // Получение всех задач
    static async getAllSongsInPlaylist(condition) {
        try {
            return await PlaylistContent.findAll({where: {playlist_id: condition}});
        } catch (error) {
            throw error;
        }
    }

    // Добавление новой задачи
    static async addSongInPlaylistContent(playlist_id,song_id) {
        try {
            console.log(playlist_id)
            console.log(song_id)
            await PlaylistContent.create({ playlist_id,song_id });
            return true
        } catch (error) {
            return false
        }
    }

    // Удаление задачи по идентификатору
    static async deleteSong(taskId) {
        try {
            await PlaylistContent.destroy({ where: { id: taskId } });
        } catch (error) {
            throw error;
        }
    }

    // Получение задачи по идентификатору
    static async getSongById(song_id) {
        try {
            return await PlaylistContent.findByPk(song_id);
        } catch (error) {
            throw error;
        }
    }

    // Получение пользователя по условию
    static async getSongByName(condition) {
        try {
            return await PlaylistContent.findOne({ where: { name: condition } });
        } catch (error) {
            throw error;
        }
    }

    // Обновление задачи по идентификатору
    static async updateSong(taskId, title) {
        try {
            const PlaylistContent = await PlaylistContent.findByPk(taskId);
            if (PlaylistContent) {
                PlaylistContent.title = title;
                await PlaylistContent.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PlaylistContentService;