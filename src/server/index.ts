/**
 * Required External Modules
 */
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import { RegisterRoute } from "./routes/base/register-route";
import { ErrorHandllerMiddleware } from "./middlewares/error-handller-middleware";
import { GlobalMiddleware } from "./middlewares/global-middleware";

/**
 * App Variables
 */
if (process.env.NODE_ENV === "development" && !process.env.PORT_BE) {
    process.exit(1);
}

const port = process.env.NODE_ENV === "development" ? (process.env.PORT_BE) : (process.env.PORT || 8080);
const mongooseURL = process.env.MONGOOSEURL;
const localBE = process.env.LOCAL_BE;
const app = express();
const distDir = path.join(__dirname, "../client");
const htmlFile = path.join(distDir, "index.html");

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distDir));
app.use(GlobalMiddleware.asyncCamelCase);
app.use(GlobalMiddleware.asyncAuthentication);

RegisterRoute.init(app);
app.use(`/${localBE}/*`, ErrorHandllerMiddleware.asyncCatchNotFound);
app.use(`/${localBE}/*`, ErrorHandllerMiddleware.asyncServerError);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Last-Modified", (new Date()).toUTCString());
    try {
        res.sendFile(htmlFile);
    } catch (err) {
        next(err);
    }
});

/**
 *  Mongoose & Server Activation
 */
mongoose.set("useFindAndModify", false);
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(result => {
    console.log(`Connect to Database successfully`);
    app.disable("etag");
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch(error => {
    console.log(`Connect to Database unsuccessfully`);
    console.log(mongooseURL);
    console.log(error);
});