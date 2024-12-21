import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as TasksApi from "../network/tasks_api";

interface NavBarLoggedInViewProps{
    user:User,
    onLogoutSucessful:()=>void,
}


const NavBarLoggedInView = ({user,onLogoutSucessful}:NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await TasksApi.logout();
            onLogoutSucessful();
        } catch (error) {
            console.error(error);
            alert(error);
            
        }
        
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as:{user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log out</Button>
        </>
     );
}
 
export default NavBarLoggedInView;