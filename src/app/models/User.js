module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: DataTypes.STRING,
            idade: DataTypes.INTEGER,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            foto: DataTypes.STRING,
            escolaridade: DataTypes.INTEGER
        }
    );

    return User;
};