import app from ".";
import orm from './config/database/database.service';

const PORT = process.env.PORT || 3000;

const initializeAppDataSource = async () => {
    try {
        await orm.authenticate();
        console.log('Connection has been established successfully.');
        await orm.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

initializeAppDataSource();

