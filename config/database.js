import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'ProyectoAPI',
    'postgres',
    '',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

export default sequelize;