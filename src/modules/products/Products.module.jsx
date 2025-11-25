import { useState, useEffect } from "react";
import styled from "styled-components";

import Product from "./components/Product";
import ProductsRepo from "../../shared/repositories/products";
import { Grid } from "../../shared/ui/layout/Grid";
import { Padding } from "../../shared/ui/Padding";
import { Text } from "../../shared/ui/Text";
import Wrapper from "../../shared/ui/layout/Wrapper";
import { Column } from "../../shared/ui/layout/Column";
import { Row } from "../../shared/ui/layout/Row";

const categoryColors = {
  Indie: "var(--color-accent-blue-light)",
  Roguelike: "var(--color-accent-green-light)",
  Shooter: "var(--color-danger)",
  Acción: "#FF4500",
  Multijugador: "#8A2BE2",
  Estrategia: "#20B2AA",
  "RPG de Acción": "#FFD700",
  "Mundo Abierto": "#DAA520",
  Fantasía: "#1E90FF",
  FPS: "#FF6347",
  "Estrategia en Tiempo Real": "#9370DB",
  Construcción: "#CD853F",
  Aventura: "#FF8C00",
  Sandbox: "#BDB76B",
  Plataformas: "#3CB371",
  Metroidvania: "#4682B4",
  Simulación: "#DAA520",
  Farming: "#6B8E23",
  "Survival Horror": "#B22222",
  Lucha: "#DC143C",
  Carreras: "#00CED1",
  "Sci-Fi": "#483D8B",
  Cooperativo: "#00BFFF",
  Historia: "#8B4513",
};

const hexToRgb = (hex) => {
  if (!hex || hex.startsWith("var(")) return "";
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `${r}, ${g}, ${b}`;
};

const StyledCategoryFilterButton = styled(Wrapper)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space-unit) * 0.6) calc(var(--space-unit) * 1.2);
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $color, $active }) => ($active ? $color : "var(--color-border)")};
  background: ${({ $color, $active }) =>
    $active
      ? $color
      : `rgba(${hexToRgb(
          $color
        )}, 0.1)`}; /* Fondo con opacidad si no está activo */
  color: ${({ $color, $active }) =>
    $active
      ? "var(--color-text-main)"
      : $color || "var(--color-text-secondary)"};
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    color: var(--color-text-main);
    background: ${({ $color }) => $color || "var(--color-bg-alt)"};
  }

  /* Estilo para el botón activo */
  &.active {
    background: ${({ $color }) => $color};
    color: var(--color-text-main);
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform: none;
  }
`;

const ProductsModule = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          ProductsRepo.getAllProducts(),
          ProductsRepo.getAllCategories(),
        ]);
        setProducts(productsData);
        setCategories(["Todas", ...categoriesData.map((c) => c.name)]);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products.filter(
          (p) =>
            p.categories &&
            p.categories.some((c) => c.name === selectedCategory)
        );

  return (
    <Padding $y={3}>
      <Wrapper>
        <Padding $x={2.5} $y={2}>
          <Column $gapY={2.5}>
            <Wrapper $textAlign="start">
              <Text
                as="h1"
                $size={2.8}
                $weight="bold"
                $color="var(--color-text-main)"
              >
                Nuestros{" "}
                <Text as="span" $color="var(--color-accent-blue)">
                  Juegos
                </Text>
              </Text>
              <Text
                as="p"
                $size={1.1}
                $color="var(--color-text-secondary)"
                style={{
                  marginTop: "calc(var(--space-unit) * 0.5)",
                  maxWidth: "700px",
                }}
              >
                Explora nuestra vasta colección de videojuegos. Filtra por
                género para encontrar tu próxima aventura.
              </Text>
            </Wrapper>
            <Wrapper
              $textAlign="start"
              style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
            >
              <Text
                as="h3"
                $size={1.5}
                $weight="bold"
                $color="var(--color-text-main)"
                style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
              >
                Filtrar por Género:
              </Text>
              <Row $gap={0.8} $wrap={true}>
                {categories.map((category) => (
                  <StyledCategoryFilterButton
                    key={category}
                    $color={
                      categoryColors[category] || "var(--color-text-secondary)"
                    }
                    $active={selectedCategory === category}
                    className={selectedCategory === category ? "active" : ""}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </StyledCategoryFilterButton>
                ))}
              </Row>
            </Wrapper>
            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>{error}</Text>
            ) : filteredProducts.length === 0 ? (
              <Wrapper
                $textAlign="center"
                style={{ padding: "calc(var(--space-unit) * 3) 0" }}
              >
                <Text as="h3" $size={1.5} $color="var(--color-text-muted)">
                  ¡Ups! No hay juegos disponibles para esta categoría.
                </Text>
                <Text
                  as="p"
                  $color="var(--color-text-secondary)"
                  style={{ marginTop: "calc(var(--space-unit) * 0.5)" }}
                >
                  Intenta seleccionar otra categoría o{" "}
                  <span
                    onClick={() => setSelectedCategory("Todas")}
                    style={{
                      cursor: "pointer",
                      color: "var(--color-accent-blue)",
                      textDecoration: "underline",
                    }}
                  >
                    ver todos los juegos
                  </span>
                  .
                </Text>
              </Wrapper>
            ) : (
              <Grid
                $gap={2.5}
                $justify="center"
                $templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
              >
                {filteredProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </Grid>
            )}
          </Column>
        </Padding>
      </Wrapper>
    </Padding>
  );
};

export default ProductsModule;
