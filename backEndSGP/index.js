const { Client } = require('pg');
const app = require('./app');
const port = 3700;

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'BDD_ SPG_SISTEM',
    password: 'Lluvia27@',
    port: 5432,
};

const client = new Client(connectionData);

client.connect()
    .then(() => {
        console.log("Conexión exitosa a PostgreSQL");
        // Crear un servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:", port);
        });
    })
    .catch(err => {
        console.error("Error de conexión:", err);
    });

