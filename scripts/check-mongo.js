import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URL;
if (!uri) {
  console.error('No MONGO_URL found in environment');
  process.exit(2);
}

const options = { serverSelectionTimeoutMS: 5000 };

console.log('Comprobando conexión a MongoDB...');

mongoose.connect(uri, options)
  .then(() => {
    console.log('✅ Conexión a MongoDB establecida correctamente.');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    // Mostrar motivo más detallado si está disponible
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  });
