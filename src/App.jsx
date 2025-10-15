import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Row } from "./shared/ui/Row";
import styled from "styled-components";
import { Text } from "./shared/ui/Text";
import { useEffect, useMemo } from "react";

const Nav = styled.nav`
  padding: 12px 24px;
  background-color: var(--color-bg-alt);
  color: var(--color-text-main);
  border-bottom: 1px solid var(--color-border);
`;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linksProps = useMemo(
    () => ({
      $decoration: "none",
      $color: "#f5f5f5",
      $weight: "bold",
      $cursor: "pointer",
      $transition: {
        property: "color",
        duration: 0.2,
        timingFunction: "ease",
      },
      $hover: {
        $color: "#2979ff"
      }
    }),
    []
  );

  const navLinks = useMemo(() => ({
    "/": "Home",
    "/products": "Products"
  }), [])

  const linkRender = useMemo(() => Object.entries(navLinks).map(([key, value]) => (
    <Text key={`router_to_${value}`} {...linksProps} children={value} onClick={() => {
      navigate(key)
    }} />
  )), [navLinks, navigate, linksProps])

  useEffect(() => {
    console.log("CURRENT LOCATION", location);

    if (location.pathname === "/")
      navigate("/home")
    
  }, [location, navigate])

  return (
    <>
      <Nav>
        <Row $justify="around" $alignItems="center">
          <h1>HELLO WORLD</h1>
          <ul>
            <Row $gap={1.125}>
              {linkRender}
            </Row>
          </ul>
        </Row>
      </Nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
