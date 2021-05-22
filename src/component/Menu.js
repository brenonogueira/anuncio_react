import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

export const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" light expand="md">
        <Container>
        <NavbarBrand href="/">SysAnuncios</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/visualizar-anuncio">Anúncios</NavLink>
                </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
