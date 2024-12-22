import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { Task as TaskModel } from '../models/task';
import * as TasksApi from "../network/tasks_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditTaskDialog from "./AddEditTaskDialog";
import SeparationBar from "../components/SeperationBar";
import Task from "./Task";



const TasksPageLoggedInView = () => {

    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [showTasksLoadingError, setShowTasksLoadingError] = useState(false);
    const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
    const [taskToEdit, setTasksToEdit] = useState<TaskModel | null>(null);

    useEffect(() => {
        async function loadTasks() {
            try {
                setShowTasksLoadingError(false);
                setTasksLoading(true);
                const tasks = await TasksApi.fetchTasks();
                setTasks(tasks);
            } catch (error) {
                console.error(error);
                setShowTasksLoadingError(true);
            } finally {
                setTasksLoading(false);
            }
        }
        loadTasks();
    }, []);

    async function deleteTask(task: TaskModel) {
        try {
            await TasksApi.deleteTask(task._id);
            setTasks(tasks.filter(existingTask => existingTask._id !== task._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }

    }

    const tasksGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {tasks.filter(task => task.category === "personal").map(task => (
                <Col key={task._id}>
                    <Task
                        task={task}
                        className={styles.note}
                        onTaskClicked={setTasksToEdit}
                        onDeleteTaskClicked={deleteTask}
                    />
                </Col>
            ))}
        </Row>

    const tasksGrid2 =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {tasks.filter(task => task.category === "work").map(task => (
                <Col key={task._id}>
                    <Task
                        task={task}
                        className={styles.note}
                        onTaskClicked={setTasksToEdit}
                        onDeleteTaskClicked={deleteTask}
                    />
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddTaskDialog(true)}>
                <FaPlus />
                Add new task
            </Button>
            {tasksLoading && <Spinner animation='border' variant='primary' />}
            {showTasksLoadingError && <p>Something went wrong.Please refresh the page.</p>}
            {!tasksLoading && !showTasksLoadingError &&
                  <>
                  {tasks.filter(task => task.category === "personal").length > 0
                      ? tasksGrid
                      : <p>You don't have any personal tasks yet</p>
                  }

                  <SeparationBar/>

                  {tasks.filter(task => task.category === "work").length > 0
                      ? tasksGrid2
                      : <p>You don't have any work-related tasks yet</p>
                  }
              </>
            }

            {showAddTaskDialog &&
                <AddEditTaskDialog
                    onDismiss={() => setShowAddTaskDialog(false)}
                    onTaskSaved={(newTask) => {
                        setTasks([...tasks, newTask]);
                        setShowAddTaskDialog(false);
                    }}
                />
            }
            {taskToEdit &&
                <AddEditTaskDialog
                    taskToEdit={taskToEdit}
                    onDismiss={() => setTasksToEdit(null)}
                    onTaskSaved={(updatedTask) => {

                        setTasks(tasks.map(existingTask => existingTask._id === updatedTask._id ? updatedTask : existingTask));
                        setTasksToEdit(null);
                    }}
                />
            }
            
        </>
    );
}

export default TasksPageLoggedInView;