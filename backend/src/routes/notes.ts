import express from "express";
import * as TasksController from "../controllers/tasks";

const router = express.Router();

router.get("/",TasksController.getTasks);

router.get("/:noteId",TasksController.getTask);

router.post("/",TasksController.createTask);

router.patch("/:noteId",TasksController.updateTask);

router.delete("/:noteId",TasksController.deleteTask);

export default router;