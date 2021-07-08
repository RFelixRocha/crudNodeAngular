const app = require('./app');
const db   = require("./app/models");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3001;

db.sequelize.sync({ force: true }).then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

});