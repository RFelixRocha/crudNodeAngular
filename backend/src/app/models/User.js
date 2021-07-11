module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                min: 5
            },
            idade: {
                type: DataTypes.INTEGER,
                isNumeric: true,
                isInt: true,  
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                isEmail: true,  
            },
            foto_key: DataTypes.STRING,
            foto_url: DataTypes.STRING,
            escolaridade: DataTypes.INTEGER
        }
    );

    

    return User;
};