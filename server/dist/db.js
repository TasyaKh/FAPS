import config from 'config';
import mysql from 'mysql';
const connection = mysql.createConnection({
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    port: config.get('portDB'),
    database: config.get('database'),
    charset: 'utf8'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});
export default connection;
//# sourceMappingURL=db.ts.map