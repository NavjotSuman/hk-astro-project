import { Router } from "express";
import { addItem, getAllItems } from "../controllers/item.controller.js";

const itemRouter = Router()

itemRouter.post("/addItem",addItem)
itemRouter.get("/getAllItems",getAllItems)


export default itemRouter