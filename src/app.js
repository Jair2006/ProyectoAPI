import express from 'express';
import bodyParser from 'body-parser';
import itemRouter from './routes/item.router.js';
import Item from './models/item.model.js';
import User from './models/user.model.js';
import Address from './models/address.model.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bienvenido a mi aplicación de Express.js.");
});

app.use("/items", itemRouter);
// app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

