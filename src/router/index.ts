import { type Request, type Response, Router, NextFunction } from "express";
import express from "express";

import { AuthController } from "../services/auth";
// import { UserController } from "../services/users";
import { DeliveryController } from "../services/delivery";
import { DelivererController } from "../services/deliverer";
import { isUserAdmin, isUserConnected } from "../middelwares";
import { NotFoundError, ErrorHandler } from "../utils";

export const router = Router();

router.post("/auth/signin", AuthController.login);
router.post("/auth/signup", AuthController.register);
router.post("/auth/verify-token", AuthController.verifyToken);

router.use("/storage", express.static("public"));

// router.get("/user/:id",  UserController.getById);
// router.put("/user/:id",  UserController.update);
// router.delete("/user/:id",  UserController.delete);
// router.get("/users",  isUserAdmin, UserController.getAll);

router.post("/deliveries",  DeliveryController.create);
router.get("/deliveries",  DeliveryController.getAll);

// router.put("/deliveries/:id",  DeliveryController.update);
// router.delete("/deliveries/:id",  DeliveryController.delete);
router.get("/deliveries/:id",  DeliveryController.getById);
router.get("/deliveries/:id/grocer",  DeliveryController.getByGrocer);
router.get("/deliveries/:id/deliverer",  DeliveryController.getByGrocer);
router.put(
  "/deliveries/:id/pick-up",
  
  DeliveryController.pickUp
);
router.put(
  "/deliveries/:id/moving",
  
  DeliveryController.moving
);
router.put(
  "/deliveries/:id/done",
  
  DeliveryController.done
);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`'${req.baseUrl}'`));
});

router.use(ErrorHandler.handle());
