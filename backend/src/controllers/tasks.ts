import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertisDefined } from "../util/assertisDefined";


export const getTasks:RequestHandler= async (req, res,next) => {
const authenticatedUserId =req.session.userId;

    try{
        const tasks=await TaskModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
    
};

export const getTask: RequestHandler=async (req,res,next)=>{
    const taskId=req.params.taskId;
    const authenticatedUserId =req.session.userId;
    try {
        assertisDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid task id");
        }

        const task=await TaskModel.findById(taskId).exec();

        if (!task){
            throw createHttpError(404,"Task not found");
        }


        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot access this task");
        }

        res.status(200).json(task);
        
    } catch (error) {
        next(error);
    }
};


interface CreateTaskBody {
    title?: string;
    text?: string;
    category?: "work" | "personal";
}

export const createTask: RequestHandler<unknown, unknown, CreateTaskBody, unknown> = async (req, res, next) => {
    const { title, text, category } = req.body;
    const authenticatedUserId = req.session.userId;

    try {
        assertisDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Task must have a title");
        }

        if (!category) {
            throw createHttpError(400, "Task must have a category");
        }

        if (!["work", "personal"].includes(category)) {
            throw createHttpError(400, "Task must have a valid category (work or personal)");
        }

        const newTask = await TaskModel.create({
            userId: authenticatedUserId,
            title,
            text,
            category
        });

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};


interface UpdateTaskParams {
    taskId: string;
}

interface UpdateTaskBody {
    title?: string;
    text?: string;
    category?: "work" | "personal";
}

export const updateTask: RequestHandler<UpdateTaskParams, unknown, UpdateTaskBody, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId;
    const { title, text, category } = req.body;
    const authenticatedUserId = req.session.userId;

    try {
        assertisDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, "Invalid task id");
        }

        if (!title) {
            throw createHttpError(400, "Task must have a title");
        }

        if (!category) {
            throw createHttpError(400, "Task must have a category");
        }

        if (!["work", "personal"].includes(category)) {
            throw createHttpError(400, "Task must have a valid category (work or personal)");
        }

        const task = await TaskModel.findById(taskId).exec();

        if (!task) {
            throw createHttpError(404, "Task not found");
        }

        if (!task.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this task");
        }

        task.title = title;
        if (text !== undefined) {
            task.text = text;
        }
        task.category = category;
        
        

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};


export const deleteTask:RequestHandler =async(req, res, next)=>{
    const taskId=req.params.taskId;
    const authenticatedUserId =req.session.userId;

    try {
        assertisDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid task id");
        }

        const task=await TaskModel.findById(taskId).exec();

        if(!task){
            throw createHttpError(404,"Note not found");
        }
        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot access this task");
        }

        await task.deleteOne();

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}