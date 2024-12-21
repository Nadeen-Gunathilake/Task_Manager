import { Container } from "react-bootstrap";
import TasksPageLoggedInView from "../components/TasksPageLoggedInView";
import TasksPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface TaskPageProps{
    loggedInUser:User | null,
}
const TasksPage = ({loggedInUser}:TaskPageProps) => {
    return ( 
        <Container className={styles.tasksPage}>

        <>
          {loggedInUser
            ? <TasksPageLoggedInView />
            : <TasksPageLoggedOutView />
          }
        </>
      </Container>
     );
}
 
export default TasksPage;