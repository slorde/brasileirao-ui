import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

const NavBar = () => {
    const history = useHistory();
    const handleClick = async () => {
      reactLocalStorage.remove('BR_SESSION_AUTH');
      history.replace('/')
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/competicoes">Bolão do Macaco Flamejante</Navbar.Brand>
        <Nav.Link className="NavLink" href="/competicoes">Home</Nav.Link>

        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Button  className="navbar-right" variant="outline-info" onClick={handleClick}>Logout</Button>
        </Nav>
      </Navbar>

    );
};

export default NavBar;