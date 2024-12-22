import { Navbar, Container } from "react-bootstrap";
import "../styles/SeparationBar.css"; 

const SeparationWorkBar = () => {
    return (
        <Navbar bg="primary" className="separation-bar">
            <Container>
                <Navbar.Brand className="separation-title">
                    Personal
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default SeparationWorkBar;
