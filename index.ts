import express, { Express } from 'express';
import env from "dotenv";
env.config();
import bodyParser from "body-parser";
import methodOverride from "method-override";
const path = require('path')
import { connect } from "./config/database";
import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';
import { systemConfig } from "./config/system";

connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// parse application/json
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});