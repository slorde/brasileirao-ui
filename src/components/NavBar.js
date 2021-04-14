import React from 'react';
import { Navbar } from 'react-bootstrap'

const NavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Bolão do Macaco Flamejante</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>

    );
};

export default NavBar;