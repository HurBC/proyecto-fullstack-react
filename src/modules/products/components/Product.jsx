import styled from "styled-components";
import Card from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";
import { Text } from "../../../shared/ui/Text";
import { Padding } from "../../../shared/ui/Padding";
import { Column } from "../../../shared/ui/layout/Column";
import { Row } from "../../../shared/ui/layout/Row";
import { useNavigate } from "react-router-dom";
import { formatCLP } from "../../../shared/_utils";

const Image = styled.img`
  width: 100%;
  max-width: 260px; /* Mantener este tamaño para la cuadrícula */
  height: 180px;
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Sombra ligeramente más pronunciada */
  background: var(
    --color-bg-alt
  ); /* Fondo si la imagen no carga o es transparente */
  margin-bottom: 0.5rem;
`;

const Product = ({ product }) => {
  if (!product) return <></>;

  const { name, description, price, stock, image } = product;

  const navigate = useNavigate();

  return (
    <Card
      title={
        <Text
          as="h3"
          $color="var(--color-text-main)"
          $size={1.4}
          $weight="bold"
          $align="center"
        >
          {name}
        </Text>
      }
      $height="auto"
      $css={`
        display:flex; 
        flex-direction:column; 
        justify-content:space-between;
        gap: calc(var(--space-unit) * 0.5); /* Espacio entre el título y la padding */
      `}
      $width="100%"
      $background="var(--gradient-surface)"
      $hover="transform: translateY(-8px) scale(1.02); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22); border-color: var(--color-accent-blue);" /* Cambio de color de borde en hover */
      $radius="12px"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <Padding $x={1.5} $y={1.5}>
        <Column $gapY={1} $alignItems="center" $justify="between">
          <Image src={image} alt={name} />
          <Text
            $color="var(--color-text-secondary)"
            $size={0.9}
            $align="center"
            $weight="500"
            style={{
              marginBottom: "0.5rem",
              height: "3.6em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
            }}
          >
            {description}
          </Text>
          <Row
            $alignItems="center"
            $justify="between"
            $gap={1.5}
            style={{ width: "100%", marginTop: "auto" }}
          >
            <Column $alignItems="start" $justify="center" $gapY={0.5}>
              <Text
                $color="var(--color-accent-green)"
                $size={1.4}
                $weight="bold"
              >
                {formatCLP(price)}
              </Text>
              <Text $color="var(--color-text-muted)" $size={0.8}>
                Stock: {stock}
              </Text>
            </Column>
            <Button onClick={() => navigate(`/products/${product.code}`)}>
              Ver más
            </Button>
          </Row>
        </Column>
      </Padding>
    </Card>
  );
};

export default Product;
