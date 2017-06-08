import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";

//routes
import {TestRoutes} from "./routes/TestRoutes";

export class ExpressServer {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configure();
        this.api();
    }

    public static bootstrap(): ExpressServer {
        return new ExpressServer();
    }

    public api() {
        let router: express.Router = express.Router();

        //custom api routes
        TestRoutes(router);

        //under /api segment
        this.app.use("/api", router);
    }

    public configure() {
        this.app.use(cors());
        this.app.use(helmet());
        //noinspection TypeScriptValidateTypes
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        // error handler
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            //noinspection TypeScriptValidateJSTypes
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    }
}