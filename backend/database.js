const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("schedule", "root", "root", {
    dialect: "sqlite",
    storage: "./dev.sqlite",
    logging: false,
});

module.exports = sequelize;
