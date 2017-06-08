import {Router, Request, Response, NextFunction} from "express";

export function TestRoutes(router: Router) {
    router.route("/test")
        .get((req: Request, res: Response, next: NextFunction) => {
            res.send("Test success!");
        });
}