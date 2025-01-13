import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const modelName = "Item";

const Item = sequelize.define(modelName, {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Celular', 'Laptop', 'Tablet', 'Accesorio'),
        allowNull: false
    }
});

await Item.sync({
    force: false,
    alter: {
        drop: false
    }
}).then(() => {
    console.log(`Modelo ${modelName} ha sido creado correctamente.`);
}).catch((err) => {
    console.error(`Error en la creación del modelo ${modelName}:\n`, err);
});

export default Item;