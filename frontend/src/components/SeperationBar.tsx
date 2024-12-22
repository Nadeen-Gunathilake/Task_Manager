import { Navbar, Container } from "react-bootstrap";
import "../styles/SeparationBar.css"; 

const SeparationBar = () => {
    return (
        <Navbar bg="primary" className="separation-bar">
            <Container>
                <Navbar.Brand className="separation-title">
                    Work
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default SeparationBar;
