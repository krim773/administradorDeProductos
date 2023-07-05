const mongoose = require('mongoose');

// Configurar el modo estricto de consulta
mongoose.set('strictQuery', true);

// Establecer la conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1/productsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database connection established")) // Conexión exitosa
    .catch((error) => console.log("There was an error", error)); // Error al conectar
