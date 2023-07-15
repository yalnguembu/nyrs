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

// router.get("/user/:id", isUserConnected, UserController.getById);
// router.put("/user/:id", isUserConnected, UserController.update);
// router.delete("/user/:id", isUserConnected, UserController.delete);
// router.get("/users", isUserConnected, isUserAdmin, UserController.getAll);

router.post("/deliveries", isUserConnected, DeliveryController.create);
router.get("/deliveries", isUserConnected, DeliveryController.getAll);

// router.put("/deliveries/:id", isUserConnected, DeliveryController.update);
// router.delete("/deliveries/:id", isUserConnected, DeliveryController.delete);
router.get("/deliveries/:id", isUserConnected, DeliveryController.getById);
router.get("/deliveries/:id/grocer", isUserConnected, DeliveryController.getByGrocer);
router.get("/deliveries/:id/deliverer", isUserConnected, DeliveryController.getByGrocer);
router.put(
  "/deliveries/:id/pickUp",
  isUserConnected,
  DeliveryController.pickUp
);
router.put(
  "/deliveries/:id/moving",
  isUserConnected,
  DeliveryController.moving
);
router.put(
  "/deliveries/:id/done",
  isUserConnected,
  DeliveryController.done
);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`'${req.baseUrl}'`));
});

router.use(ErrorHandler.handle());
