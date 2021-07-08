module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: DataTypes.STRING,
            idade: DataTypes.INTEGER,
            email: DataTypes.STRING,
            foto: DataTypes.STRING,
            escolaridade: DataTypes.INTEGER
        }
    );

    return User;
};