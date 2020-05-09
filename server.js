import express from "express";
import bodyParser from "body-parser";
import router from './app/routes/route'
import db from "./models";

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));
const PORT_USED = 3001;
app.use('/public/uploads', express.static('public/uploads/'));
app.use("/", router);

db.sequelize.sync().then(() => {
    app.listen(PORT_USED, () => console.log(`App listening on port ${PORT_USED}!`));
});

