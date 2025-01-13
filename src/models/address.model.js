import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "./user.model.js";

const modelName = "Address";

const Address = sequelize.define(modelName, {
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street2: {
        type: DataTypes.STRING,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reference: {
        type: DataTypes.TEXT
    }
});

Address.belongsTo(User, {
    through: 'user_id'
});

await Address.sync({
    force: false,
    alter: {
        drop: false
    }
}).then(() => {
    console.log(`Modelo ${modelName} ha sido creado correctamente.`);
}).catch((err) => {
    console.error(`Error en la creación del modelo ${modelName}:\n`, err);
});

export default Address;