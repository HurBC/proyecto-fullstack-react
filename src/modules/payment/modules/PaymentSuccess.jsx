import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  border: 1px solid var(--color-success); /* Borde verde para éxito */
  box-shadow: 0 8px 24px rgba(0, 255, 92, 0.2); /* Sombra verde */
  overflow: hidden;
  text-align: center;
`;

const PaymentSuccessModule = () => {
  const navigate = useNavigate();

  return (
    <StyledStatusContainer>
      <Padding $x={2.5} $y={3.5}>
        <Column $gapY={1.5} $alignItems="center">
          <Text
            as="h2"
            $size={3}
            $weight="bold"
            $color="var(--color-success)"
            style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
          >
            ¡Pago Exitoso!
          </Text>
          <Text
            as="p"
            $size={1.2}
            $color="var(--color-text-main)"
            style={{ maxWidth: "400px", lineHeight: 1.6 }}
          >
            Tu compra ha sido procesada con éxito. ¡Pronto recibirás tus juegos!
          </Text>
          <Text
            as="p"
            $size={1}
            $color="var(--color-text-muted)"
            style={{ marginTop: "calc(var(--space-unit) * 1)" }}
          >
            Gracias por tu preferencia.
          </Text>
          <Row $gap={1.5} style={{ marginTop: "calc(var(--space-unit) * 2)" }}>
            <Button onClick={() => navigate("/home")}>Volver al Inicio</Button>
            <Button
              onClick={() => navigate("/products")}
              $background="var(--color-surface)"
              $color="var(--color-text-secondary)"
              $hover={{
                background: "var(--color-bg-alt)",
                color: "var(--color-text-main)",
              }}
              style={{ border: "1px solid var(--color-border)" }}
            >
              Explorar más juegos
            </Button>
          </Row>
        </Column>
      </Padding>
    </StyledStatusContainer>
  );
};

export default PaymentSuccessModule;
