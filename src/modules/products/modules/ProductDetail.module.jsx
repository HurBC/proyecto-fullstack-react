import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { Button } from "../../../shared/components/Button";
import { Text } from "../../../shared/ui/Text";
import { Padding } from "../../../shared/ui/Padding";
import { Row } from "../../../shared/ui/layout/Row";
import { Column } from "../../../shared/ui/layout/Column";
import Wrapper from "../../../shared/ui/layout/Wrapper";
import ProductsRepo from "../../../shared/repositories/products";
import { useCart } from "../../../shared/providers/CartProvider";
import { formatCLP } from "../../../shared/_utils";

const StyledProductDetailCard = styled(Wrapper)`
  max-width: 960px; /* Aumenta el ancho máximo para una vista más espaciosa */
  margin: 2.5rem auto; /* Más espacio arriba y abajo */
  background: var(--gradient-surface); /* Fondo con gradiente */
  border-radius: 12px; /* Bordes más redondeados */
  border: 1px solid var(--color-border); /* Borde sutil */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); /* Sombra más pronunciada para un efecto flotante */
  overflow: hidden; /* Asegura que los bordes redondeados se apliquen a todo el contenido */

  /* Un poco de padding interno por defecto, que Padding puede sobrescribir */
  padding: var(--space-unit);
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 420px; /* Aumenta el tamaño máximo de la imagen */
  height: 300px; /* Altura fija para consistencia */
  object-fit: cover;
  border-radius: 8px; /* Bordes redondeados para la imagen */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Sombra para la imagen */
  background: var(--color-bg-alt); /* Un fondo más oscuro para la imagen */
  flex-shrink: 0;
  /* margin-right: 1.5rem;  Esto se manejará con gap en Row */

  /* Para pantallas pequeñas, la imagen puede ocupar todo el ancho */
  @media (max-width: 768px) {
    max-width: 100%;
    height: 240px; /* Ajusta la altura para móviles */
  }
`;

const StyledQtyInput = styled.input`
  width: 100px; /* Un poco más ancho para mejor interacción */
  padding: calc(var(--space-unit) * 0.75) calc(var(--space-unit) * 1);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text-main);
  font-size: 1rem;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent-blue);
    box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.3);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const ProductDetail = () => {
  const [qty, setQty] = useState(1);

  const { code } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = ProductsRepo.getProductById(code);

  if (!product) {
    return (
      <Padding $y={4}>
        <Wrapper $textAlign="center">
          <Text
            as="h2"
            $size={2}
            $weight="bold"
            style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
          >
            Producto no encontrado
          </Text>
          <Text
            as="p"
            $color="var(--color-text-secondary)"
            style={{
              marginBottom: "calc(var(--space-unit) * 1.5)",
              maxWidth: "500px",
              margin: "0 auto calc(var(--space-unit) * 1.5)",
            }}
          >
            Lo sentimos, el producto que buscas no está disponible o la URL es
            incorrecta.
          </Text>
          <Button onClick={() => navigate("/home")}>Volver a la tienda</Button>
        </Wrapper>
      </Padding>
    );
  }

  return (
    <StyledProductDetailCard>
      <Padding $x={2.5} $y={2.5}>
        <Row $alignItems="flex-start" $gap={3} $wrap={true}>
          <StyledImage src={product.image} alt={product.name} />
          <Column $gapY={1}>
            <Text
              as="h2"
              $size={2.5}
              $weight="bold"
              $color="var(--color-text-main)"
              style={{ marginBottom: "calc(var(--space-unit) * 0.5)" }}
            >
              {product.name}
            </Text>
            <Text
              as="p"
              $size={1.1}
              $color="var(--color-text-secondary)"
              style={{ lineHeight: 1.6 }}
            >
              {product.description}
            </Text>
            <Row
              $gap={1.5}
              $alignItems="baseline"
              style={{ marginTop: "calc(var(--space-unit) * 1.5)" }}
            >
              <Text $size={2} $color="var(--color-accent-green)" $weight="bold">
                {formatCLP(product.price)}
              </Text>
              <Text $size={1} $color="var(--color-text-muted)">
                Stock:{" "}
                {product.stock > 0
                  ? `${product.stock} unidades disponibles`
                  : "Sin stock"}
              </Text>
            </Row>
            <Row
              $gap={1}
              $alignItems="center"
              style={{ marginTop: "calc(var(--space-unit) * 2)" }}
            >
              <StyledQtyInput
                type="number"
                min={1}
                max={product.stock > 0 ? product.stock : 1}
                value={qty}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10) || 1;
                  setQty(value);
                }}
                disabled={product.stock === 0}
              />
              <Button
                onClick={() => addItem(product, qty)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </Button>
              <Button
                onClick={() => navigate("/home")}
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
                Volver a la tienda
              </Button>
            </Row>
            {product.stock === 0 && (
              <Text
                $color="var(--color-danger)"
                $size={0.9}
                style={{ marginTop: "calc(var(--space-unit) * 0.5)" }}
              >
                Este producto está agotado.
              </Text>
            )}
          </Column>
        </Row>
      </Padding>
    </StyledProductDetailCard>
  );
};

export default ProductDetail;
