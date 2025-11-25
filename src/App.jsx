import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Text } from "./shared/ui/Text";
import { useEffect, useMemo } from "react";
import { Button } from "./shared/components/Button";
import { useCart } from "./shared/providers/CartProvider";
import { useAuth } from "./shared/providers/AuthProvider";
import { Navbar, Nav, Container } from "react-bootstrap";

const StyledNavbar = styled(Navbar)`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: calc(var(--space-unit) * 1) calc(var(--space-unit) * 2.5);
  background: var(--gradient-page);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  color: var(--color-text-main);
  backdrop-filter: blur(8px);
`;

const NavLinkText = styled(Nav.Link)`
  display: inline-block;
  padding: calc(var(--space-unit) * 0.5) calc(var(--space-unit) * 0.75);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: var(--color-text-main);
    background-color: var(--color-surface);
    transform: translateY(-2px);
  }

  &.active {
    color: var(--color-accent-blue);
    background-color: rgba(41, 121, 255, 0.15);
    font-weight: 600;
    transform: none;
  }
`;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCart();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (
      !isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  const navLinks = useMemo(
    () => [
      { path: "/home", name: "Inicio" },
      { path: "/products", name: "Productos" },
      { path: "/about-us", name: "Acerca de" },
      { path: "/contact", name: "Contacto" },
    ],
    []
  );

  return (
    <>
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home" style={{ textDecoration: "none" }}>
            <Text as="h1" $size={1.8} $weight="bold" $color="var(--color-text-main)">
              Level <Text as="span" $color="var(--color-accent-blue)">UP</Text>
            </Text>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navLinks.map((link) => (
                <NavLinkText
                  key={link.path}
                  disabled={!isAuthenticated}
                  active={location.pathname.startsWith(link.path)}
                  onClick={() => {
                    if (isAuthenticated) navigate(link.path);
                  }}
                >
                  {link.name}
                </NavLinkText>
              ))}
            </Nav>
            <Nav>
              {isAuthenticated && (
                <>
                  <Button onClick={() => navigate("/cart")} className="me-2">
                    Carrito ({cart.items.length})
                  </Button>
                  <Button
                    onClick={logout}
                    $background="none"
                    $color="var(--color-text-secondary)"
                    $hover={{
                      background: "var(--color-bg-alt)",
                      color: "var(--color-text-main)",
                      transform: "translateY(-1px)",
                    }}
                    $transition={{ property: "all", duration: 0.3 }}
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
