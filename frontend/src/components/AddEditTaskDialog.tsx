import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Task } from "../models/task";
import { TaskInput } from "../network/tasks_api";
import { useForm } from "react-hook-form";
import * as TasksApi from "../network/tasks_api";
import TextInputField from "./form/TextInputField";

interface AddEditTaskDialogProps {
    taskToEdit?: Task,
    onDismiss: () => void,
    onTaskSaved: (note: Task) => void,
}

const AddEditTaskDialog = ({ taskToEdit, onDismiss, onTaskSaved }: AddEditTaskDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskInput>({
        defaultValues: {
            title: taskToEdit?.title || "",
            text: taskToEdit?.text || "",
            category: taskToEdit?.category || ""
        }
    });

    async function onSubmit(input: TaskInput) {
        try {
            let taskResponse: Task;
            if (taskToEdit) {
                taskResponse = await TasksApi.updateTask(taskToEdit._id, input);
            }
            else {
                taskResponse = await TasksApi.createTask(input);
            }

            onTaskSaved(taskResponse);

        } catch (error) {
            console.error(error);
            alert(error);
        }

    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {taskToEdit ? "Edit task" : "Add task"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditTaskForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />

                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            {...register("category", { required: "Category is required" })}
                            aria-label="Select category"
                        >
                            <option value="">Select</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </Form.Select>
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                        
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditTaskForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditTaskDialog;