const sequelize = require('./config/database');
const Users = require('./models/Users');
const Song = require('./models/Song');

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