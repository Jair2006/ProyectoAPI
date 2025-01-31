import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Address from "./item.model.js";

const modelName = "User";

const User = sequelize.define(modelName, {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    validate: {
      isBefore: new Date().toISOString(),
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "employee", "client"),
    allowNull: false,
    defaultValue: "client",
  },
});

User.belongsToMany(Address, {
  through: "user_id",
});

await User.sync({
  force: false,
  alter: {
    drop: false,
  },
})
  .then(() => {
    console.log(`Modelo ${modelName} ha sido creado correctamente.`);
  })
  .catch((err) => {
    console.error(`Error en la creación del modelo ${modelName}:\n`, err);
  });

export default User;
