import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Padding } from "../../../shared/ui/Padding";
import { Column } from "../../../shared/ui/layout/Column";
import { Row } from "../../../shared/ui/layout/Row";
import Button from "../../../shared/components/Button";
import Wrapper from "../../../shared/ui/layout/Wrapper";
import { Text } from "../../../shared/ui/Text";

const StyledStatusContainer = styled(Wrapper)`
  max-width: 600px;
  margin: 4rem auto;
  background: var(--gradient-surface);
  border-radius: 12px;
  border: 1px solid var(--color-danger); /* Borde rojo para error */
  box-shadow: 0 8px 24px rgba(255, 77, 77, 0.2); /* Sombra roja */
  overflow: hidden;
  text-align: center;
`;

const PaymentFailureModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = location.state || {
    message:
      "Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo o contacta con soporte.",
  };

  return (
    <StyledStatusContainer>
      <Padding $x={2.5} $y={3.5}>
        <Column $gapY={1.5} $alignItems="center">
          <Text
            as="h2"
            $size={3}
            $weight="bold"
            $color="var(--color-danger)"
            style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
          >
            ¡Error en el Pago!
          </Text>
          <Text
            as="p"
            $size={1.2}
            $color="var(--color-text-main)"
            style={{ maxWidth: "450px", lineHeight: 1.6 }}
          >
            {message}
          </Text>
          <Row $gap={1.5} style={{ marginTop: "calc(var(--space-unit) * 2)" }}>
            <Button onClick={() => navigate("/cart")}>Volver al Carrito</Button>
            <Button
              onClick={() => navigate("/payment")}
              $background="var(--color-surface)"
              $color="var(--color-text-secondary)"
              $hover={{
                background: "var(--color-bg-alt)",
                color: "var(--color-text-main)",
              }}
              style={{ border: "1px solid var(--color-border)" }}
            >
              Reintentar Pago
            </Button>
          </Row>
        </Column>
      </Padding>
    </StyledStatusContainer>
  );
};

export default PaymentFailureModule;
