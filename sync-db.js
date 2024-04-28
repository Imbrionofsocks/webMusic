const sequelize = require('./config/database');
const Task = require('./models/Users');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        process.exit();
    }
}

syncDatabase();