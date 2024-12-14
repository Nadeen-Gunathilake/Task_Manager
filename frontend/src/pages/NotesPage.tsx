import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotePageProps{
    loggedInUser:User | null,
}
const NotesPage = ({loggedInUser}:NotePageProps) => {
    return ( 
        <Container className={styles.notesPage}>

        <>
          {loggedInUser
            ? <NotesPageLoggedInView />
            : <NotesPageLoggedOutView />
          }
        </>
      </Container>
     );
}
 
export default NotesPage;