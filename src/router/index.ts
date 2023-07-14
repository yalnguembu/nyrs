import { type Request, type Response, Router, NextFunction } from "express";
import express from "express";

import { AuthController } from "../services/auth";
import { UserController } from "../services/users";
import { TagController } from "../services/tags";
import { NoteController } from "../services/notes";
import { isUserAdmin, isUserConnected } from "../middelwares";
import { NotFoundError, ErrorHandler } from "../utils";

export const router = Router();

router.post("/auth/signin", AuthController.login);
router.post("/auth/signup", AuthController.register);
router.post("/auth/verify-token", AuthController.verifyToken);

router.use("/storage", express.static("public"));

// router.get("/user/:id", isUserConnected, UserController.getById);
// router.put("/user/:id", isUserConnected, UserController.update);
// router.delete("/user/:id", isUserConnected, UserController.delete);
// router.get("/users", isUserConnected, isUserAdmin, UserController.getAll);

router.post("/tag", isUserConnected, isUserAdmin, TagController.create);
router.put("/tag/:id", isUserConnected, isUserAdmin, TagController.update);
router.delete("/tag/:id", isUserConnected, isUserAdmin, TagController.delete);
router.get("/tags", isUserConnected, isUserAdmin, TagController.getAll);

router.post("/note", isUserConnected, NoteController.create);
router.get("/notes", isUserConnected, NoteController.getAll);
router.get("/notes/archived", isUserConnected, NoteController.getArchived);

router.put("/note/:id", isUserConnected, NoteController.update);
router.delete("/note/:id", isUserConnected, NoteController.delete);
router.get("/note/:id", isUserConnected, NoteController.getById);
router.put("/note/:id/cancel", isUserConnected, NoteController.cancel);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`'${req.baseUrl}'`));
});

router.use(ErrorHandler.handle());
