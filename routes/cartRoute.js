import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewere/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.delete("/remove",authMiddleware, removeFromCart);
cartRouter.get("/get",authMiddleware, getCart);

export default cartRouter;
