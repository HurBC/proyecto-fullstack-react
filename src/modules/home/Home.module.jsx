import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Text } from "../../shared/ui/Text";
import ProductsRepo from "../../shared/repositories/products";
import { Row } from "../../shared/ui/layout/Row";
import { Padding } from "../../shared/ui/Padding";
import { Column } from "../../shared/ui/layout/Column";
import Wrapper from "../../shared/ui/layout/Wrapper";
import { Button } from "../../shared/components/Button";
import Product from "../products/components/Product";
import { Grid } from "../../shared/ui/layout/Grid";
import Card from "../../shared/components/Card";
import { formatCLP } from "../../shared/_utils";

const HeroImage = styled.img`
  width: 100%;
  max-width: 400px; /* Tamaño máximo para la imagen del héroe */
  height: 280px; /* Altura fija para consistencia */
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  background: var(--color-bg-alt); /* Fondo si la imagen no carga */
  flex-shrink: 0;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 200px;
  }
`;

const HeroSection = styled(Wrapper)`
  background: linear-gradient(
    180deg,
    var(--color-bg-alt) 0%,
    var(--color-surface) 100%
  );
  border-bottom: 1px solid var(--color-border);
  padding-bottom: calc(
    var(--space-unit) * 4
  ); /* Más padding en la parte inferior */
`;

const FeaturedProductCard = styled(Card)`
  width: 100%;
  max-width: 70rem; /* Ancho máximo para la tarjeta destacada */
  background: var(--gradient-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }
`;

const categoryColors = {
  Indie: "var(--color-accent-blue-light)",
  "Roguelike / Shooter": "var(--color-accent-green-light)",
  "RPG de Acción": "#FFD700",
  Shooter: "var(--color-danger)",
  "Estrategia en Tiempo Real": "#9370DB",
  "Aventura / Sandbox": "#FF8C00",
  "RPG de Fantasía": "#1E90FF",
  "Plataformas / Aventura": "#3CB371",
  "Simulación / RPG": "#DAA520",
  "Survival Horror": "#B22222",
  Lucha: "#DC143C",
  Carreras: "#00CED1",
};

const StyledCategoryItem = styled(Wrapper)`
  display: inline-flex; /* Para que ocupen solo el espacio necesario */
  align-items: center;
  justify-content: center;
  padding: calc(var(--space-unit) * 0.5) calc(var(--space-unit) * 1);
  border-radius: 20px; /* Bordes redondeados para un aspecto de 'chip' */
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $color }) => $color || "var(--color-border)"};
  background: ${({ $color }) =>
    $color ? `rgba(${hexToRgb($color)}, 0.2)` : "var(--color-surface)"};
  color: ${({ $color }) => $color || "var(--color-text-main)"};
  white-space: nowrap; /* Evita que el texto de la categoría se divida */

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${({ $color }) =>
      $color ? `rgba(${hexToRgb($color)}, 0.3)` : "var(--color-bg-alt)"};
    color: var(--color-text-main); /* Asegura que el texto sea visible */
  }
`;

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

const HomeModule = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const firstFeaturedProduct = useMemo(
    () => (featuredProducts ? featuredProducts[0] : null),
    [featuredProducts]
  );

  useEffect(() => {
    const currentProducts = ProductsRepo.getFeaturedProducts();

    setFeaturedProducts(currentProducts);

    const allCategories = ProductsRepo.getAllCategories();

    setCategories(allCategories);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products/categories/${encodeURIComponent(category)}`);
  };

  return (
    <Column $gapY={5}>
      <HeroSection as="header">
        <Padding $x={2.5} $y={4}>
          <Row $justify="center" $alignItems="center" $wrap $gap={4}>
            <Column
              style={{ flex: "1 1 500px", minWidth: 0, textAlign: "start" }}
              $gapY={1.5}
            >
              <Text
                as="h1"
                $size={3.2}
                $weight="bold"
                $color="var(--color-text-main)"
              >
                Level{" "}
                <Text as="span" $color="var(--color-accent-blue)">
                  Up
                </Text>
              </Text>
              <Text
                as="p"
                $size={1.1}
                $color="var(--color-text-secondary)"
                style={{
                  maxWidth: 680,
                  lineHeight: 1.6,
                }}
              >
                Bienvenido a nuestra arena digital. Sumérgete en un universo de
                videojuegos, desde los éxitos de taquilla hasta joyas ocultas.
                Explora nuestros títulos destacados o navega por categorías para
                encontrar tu próxima aventura.
              </Text>
              <div style={{ marginTop: "calc(var(--space-unit) * 1.5)" }}>
                <Button
                  onClick={() => {
                    window.scrollTo({
                      top: window.innerHeight * 0.8,
                      behavior: "smooth",
                    });
                  }}
                >
                  Explorar juegos
                </Button>
              </div>
            </Column>
            {firstFeaturedProduct && (
              <FeaturedProductCard
                $width="auto"
                $height="auto"
                $hover="transform: translateY(-5px) scale(1.01); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); border-color: var(--color-accent-blue);"
              >
                <Padding $x={2} $y={2}>
                  <Text
                    as="h3"
                    $size={1.8}
                    $weight="bold"
                    $color="var(--color-text-main)"
                    style={{ marginBottom: "calc(var(--space-unit) * 1.5)" }}
                  >
                    Juego Destacado
                  </Text>
                  <Row $justify="center" $gapX={2.5} $wrap={true}>
                    <HeroImage
                      src={firstFeaturedProduct.image}
                      alt={`${firstFeaturedProduct.code}_image`}
                    />
                    <Column
                      $gapY={1}
                      style={{ flex: "1 1 300px", minWidth: 0 }}
                    >
                      <Text
                        as="h4"
                        $size={1.6}
                        $weight="bold"
                        $color="var(--color-text-main)"
                      >
                        {firstFeaturedProduct.name}
                      </Text>
                      <Text
                        as="p"
                        $color="var(--color-text-secondary)"
                        $size={1}
                        style={{ lineHeight: 1.5 }}
                      >
                        {firstFeaturedProduct.description}
                      </Text>
                      <Row
                        $gap={1}
                        $alignItems="center"
                        style={{ marginTop: "calc(var(--space-unit) * 1)" }}
                      >
                        <Text
                          $size={1.5}
                          $color="var(--color-accent-green)"
                          $weight="bold"
                        >
                          {formatCLP(firstFeaturedProduct.price)}
                        </Text>
                        <Button
                          onClick={() => {
                            navigate(`/products/${firstFeaturedProduct.code}`);
                          }}
                        >
                          Ver detalles
                        </Button>
                      </Row>
                    </Column>
                  </Row>
                </Padding>
              </FeaturedProductCard>
            )}
          </Row>
        </Padding>
      </HeroSection>
      <Wrapper $width="100%">
        <Padding $x={2.5} $y={2}>
          <Wrapper
            $textAlign="start"
            style={{ marginBottom: "calc(var(--space-unit) * 1.5)" }}
          >
            <Text
              as="h2"
              $size={2}
              $weight="bold"
              $color="var(--color-text-main)"
            >
              Explorar por Género
            </Text>
          </Wrapper>
          <Row $gap={1} $wrap={true} $justify="center">
            {categories.map((category) => (
              <StyledCategoryItem
                key={category}
                $color={
                  categoryColors[category] || "var(--color-text-secondary)"
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </StyledCategoryItem>
            ))}
          </Row>
        </Padding>
      </Wrapper>
      <Wrapper $width="100%">
        <Padding $x={2.5} $y={2}>
          <Wrapper
            $textAlign="start"
            style={{ marginBottom: "calc(var(--space-unit) * 2)" }}
          >
            <Text
              as="h2"
              $size={2.4}
              $weight="bold"
              $color="var(--color-text-main)"
            >
              Otros Títulos Destacados
            </Text>
          </Wrapper>
          <Grid
            $gap={2.5}
            $justify="center"
            $templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          >
            {featuredProducts.length <= 1 ? (
              <Text
                as="p"
                $color="var(--color-text-muted)"
                $align="center"
                style={{ gridColumn: "1 / -1" }}
              >
                No hay más productos destacados por el momento.
              </Text>
            ) : (
              featuredProducts
                .slice(1)
                .map((product) => (
                  <Product key={`product_${product.code}`} product={product} />
                ))
            )}
          </Grid>
        </Padding>
      </Wrapper>
    </Column>
  );
};

export default HomeModule;
