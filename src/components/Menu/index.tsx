import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

interface interfaceDataMenu {
  id: number,
  categorie: string
}

export const Menu = () => {
  const [dataMenu, setDataMenu] = useState<Array<interfaceDataMenu>>([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/categories" /*,
    {
        headers: {"Authorization":"Bearer T O K E N"}
    }*/
      )
      .then((response) => {
        setDataMenu(response.data);
      });
  }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Link className="navbar-brand" to="/">
            U2
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Icone Menu, quando em tela de celular (Repsonsivo) */}
          <Navbar.Collapse> {/* Icones quem ficam dentro do menu */}
            <Nav className="me-auto"> {/*Nav à esquerda */}
              <Link className="nav-link" to="/">
                Home
              </Link>
              {dataMenu.map((menu) => {
                return (
                  <Link key={menu.id} className="nav-link" to={"/categories/" + menu.id}>
                    {menu.categorie}
                  </Link>
                );
              })}
            </Nav>
            <Nav>{/*Nav à direita */}
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={22} />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
