const Song = require('../models/Song');


class SongService {
    // Получение всех задач
    static async getAllSongs() {
        try {
            return await Song.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Добавление новой задачи
    static async addSong(name, author, file) {
        try {
            console.log(name)
            console.log(author)
            console.log(file)
            await Song.create({ name, author, file });
            return true
        } catch (error) {
            return false
        }
    }

    // Удаление задачи по идентификатору
    static async deleteSong(taskId) {
        try {
            await Song.destroy({ where: { id: taskId } });
        } catch (error) {
            throw error;
        }
    }

    // Получение задачи по идентификатору
    static async getSongById(song_id) {
        try {
            return await Song.findByPk(song_id);
        } catch (error) {
            throw error;
        }
    }

    // Получение пользователя по условию
    static async getSongByName(condition) {
        try {
            return await Song.findOne({ where: { name: condition } });
        } catch (error) {
            throw error;
        }
    }

    // Обновление задачи по идентификатору
    static async updateSong(taskId, title) {
        try {
            const song = await Song.findByPk(taskId);
            if (song) {
                song.title = title;
                await song.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SongService;