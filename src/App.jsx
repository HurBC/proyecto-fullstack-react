import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Row } from "./shared/ui/layout/Row";
import Wrapper from "./shared/ui/layout/Wrapper";
import styled from "styled-components";
import { Text } from "./shared/ui/Text";
import { useEffect, useMemo } from "react";
import { Button } from "./shared/components/Button";
import { useCart } from "./shared/providers/CartProvider";
import { useAuth } from "./shared/providers/AuthProvider";

const StyledNav = styled(Wrapper).attrs({ as: "nav" })`
  // Usamos Wrapper como base para Nav
  position: sticky; /* Fija el navbar en la parte superior */
  top: 0;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
  padding: calc(var(--space-unit) * 1) calc(var(--space-unit) * 2.5); /* Más padding */
  background: var(--gradient-page); /* Usa el gradiente para el fondo */
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
  color: var(--color-text-main);
  backdrop-filter: blur(8px); /* Efecto de desenfoque sutil */
`;

const NavLinkText = styled(Text).attrs({ as: "span" })`
  display: inline-block; /* Para que el padding y hover funcionen bien */
  padding: calc(var(--space-unit) * 0.5) calc(var(--space-unit) * 0.75); /* Padding para cada link */
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text-secondary); /* Color secundario por defecto */
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: var(--color-text-main);
    background-color: var(--color-surface); /* Fondo sutil en hover */
    transform: translateY(-2px); /* Efecto de levantamiento */
  }

  /* Estilo para el link activo */
  &.active {
    color: var(--color-accent-blue);
    background-color: rgba(
      41,
      121,
      255,
      0.15
    ); /* Fondo de acento con opacidad */
    font-weight: 600;
    transform: none; /* Desactiva el levantamiento si está activo */
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
      <StyledNav>
        <Row $justify="between" $alignItems="center" $wrap={true} $gap={2}>
          {" "}
          <Link to="/home" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Text
              as="h1"
              $size={1.8}
              $weight="bold"
              $color="var(--color-text-main)"
            >
              Level{" "}
              <Text as="span" $color="var(--color-accent-blue)">
                UP
              </Text>
            </Text>
          </Link>
          <nav>
            <Row $gap={1}>
              {" "}
              {navLinks.map((link) => (
                <NavLinkText
                  key={link.path}
                  className={
                    location.pathname.startsWith(link.path) && link.path !== "/"
                      ? "active"
                      : location.pathname === "/" && link.path === "/home"
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    if (isAuthenticated) navigate(link.path);
                  }}
                >
                  {link.name}
                </NavLinkText>
              ))}
            </Row>
          </nav>
          <Row $gap={1} $alignItems="center" style={{ flexShrink: 0 }}>
            {isAuthenticated && (
              <>
                <Button onClick={() => navigate("/cart")}>
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
          </Row>
        </Row>
      </StyledNav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
