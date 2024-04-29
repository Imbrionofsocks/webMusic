const Playlists = require('../models/Playlists');



class PlaylistService {
    // Получение всех задач
    static async getAllPlaylist() {
        try {
            return await Playlists.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getAllPlaylistUser(condition) {
        try {
            return await Playlists.findAll({where: {user_id: condition}});
        } catch (error) {
            throw error;
        }
    }

    // Добавление новой задачи
    static async addPlaylist(playlist_name, user_id, playlist_image) {
        try {
            console.log(playlist_name)
            console.log(user_id)
             await Playlists.create({ playlist_name, user_id, playlist_image });
            console.log('ok')
        } catch (error) {
            console.log(error)
        }
    }

    // Удаление задачи по идентификатору
    static async deleteSong(taskId) {
        try {
            await Playlists.destroy({ where: { id: taskId } });
        } catch (error) {
            throw error;
        }
    }

    // Получение задачи по идентификатору
    static async getPlaylistById(playlist_id) {
        try {
            return await Playlists.findByPk(playlist_id);
        } catch (error) {
            throw error;
        }
    }

    // Получение пользователя по условию
    static async getSongByName(condition) {
        try {
            return await Playlists.findOne({ where: { name: condition } });
        } catch (error) {
            throw error;
        }
    }

    // Обновление задачи по идентификатору
    static async updateSong(taskId, title) {
        try {
            const Playlists = await Playlists.findByPk(taskId);
            if (Playlists) {
                Playlists.title = title;
                await Playlists.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PlaylistService;