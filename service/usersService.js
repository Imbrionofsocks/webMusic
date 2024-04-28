const Task = require('../models/Users');


class UsersService {
    // Получение всех задач
    static async getAllTasks() {
        try {
            return await Task.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Добавление новой задачи
    static async addTask(email, password) {
        try {
            await Task.create({ email,password });
            return true
        } catch (error) {
            return false;
        }
    }

    // Переключение статуса выполнения задачи
    static async toggleTaskCompletion(taskId) {
        try {
            const task = await Task.findByPk(taskId);
            if (task) {
                task.completed = !task.completed;
                await task.save();
            }
        } catch (error) {
            throw error;
        }
    }

    // Удаление задачи по идентификатору
    static async deleteTask(taskId) {
        try {
            await Task.destroy({ where: { id: taskId } });
        } catch (error) {
            throw error;
        }
    }

    // Получение задачи по идентификатору
    static async getTaskById(taskId) {
        try {
            return await Task.findByPk(taskId);
        } catch (error) {
            throw error;
        }
    }

    // Получение пользователя по условию
    static async getTaskByEmail(condition) {
        try {
            return await Task.findOne({ where: { email: condition } });
        } catch (error) {
            throw error;
        }
    }

    // Обновление задачи по идентификатору
    static async updateTask(taskId, title) {
        try {
            const task = await Task.findByPk(taskId);
            if (task) {
                task.title = title;
                await task.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersService;