import { InferSchemaType, model, Schema } from "mongoose";

const taskSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,required:true},
    title:{type:String,required:true},
    text:{type:String},
    category: {                      
        type: String,
        enum: ["work", "personal"],
        required: true
    }

},{timestamps:true});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task",taskSchema);
