const sequelize = require('./config/database');
const userRoutes = require('./routes/UserRoutes');
const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const authRoutes = require('./routes/AuthRoutes');
const productImageRoutes = require('./routes/ProductImageRoutes');
const productOptionRoutes = require('./routes/ProductOptionRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/product-options', productOptionRoutes);
app.use('/product-images', productImageRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API da loja virtual funcionando!'
    });
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao banco de dados:', erro.message);
    });