import { Router } from "express";
import register from "./register";
import login from "./login";

const routes = Router();

routes.post("/register", register);
routes.post("/login", login);

export default routes;
