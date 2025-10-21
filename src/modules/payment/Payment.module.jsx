import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { Text } from "../../shared/ui/Text";
import { Padding } from "../../shared/ui/Padding";
import { Column } from "../../shared/ui/layout/Column";
import { Row } from "../../shared/ui/layout/Row";
import Wrapper from "../../shared/ui/layout/Wrapper";
import { Button } from "../../shared/components/Button";
import { useCart } from "../../shared/providers/CartProvider";
import { formatCLP } from "../../shared/_utils";

const StyledInput = styled.input`
  width: 100%;
  padding: calc(var(--space-unit) * 0.75) calc(var(--space-unit) * 1);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text-main);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent-blue);
    box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.3);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const Field = styled.div`
  margin-bottom: var(--space-unit);
`;

const StyledLabel = styled(Text).attrs({ as: "label" })`
  display: block;
  margin-bottom: calc(var(--space-unit) * 0.3);
  color: var(--color-text-secondary);
  font-weight: 500;
`;

const StyledPaymentContainer = styled(Wrapper)`
  max-width: 600px; /* Un poco más estrecho para el formulario de pago */
  margin: 2.5rem auto;
  background: var(--gradient-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const isValidCreditCardNumber = (cardNumber) => {
  const cleanedNumber = String(cardNumber).replace(/\s/g, "").replace(/-/g, "");

  if (!/^\d{16}$/.test(cleanedNumber)) {
    return {
      valid: false,
      message: "El número de tarjeta debe tener 16 dígitos.",
    };
  }

  if (cleanedNumber.startsWith("4")) {
    return { valid: true, message: "Número de tarjeta válido." };
  } else if (cleanedNumber.startsWith("5")) {
    return {
      valid: false,
      message: "Error en el procesamiento de la tarjeta. Intente con otra.",
    };
  } else {
    return {
      valid: false,
      message: "Número de tarjeta no reconocido para esta simulación.",
    };
  }
};

const PaymentPageModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const { totalPrice, items } = location.state || { totalPrice: 0, items: [] };

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!totalPrice || items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [totalPrice, items, navigate]);

  const handlePaymentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setPaymentError(null);
      setIsProcessing(true);

      const { valid, message } = isValidCreditCardNumber(cardNumber);

      if (!valid) {
        setPaymentError(message);
        setIsProcessing(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (valid) {
        clearCart();
        navigate("/payment/success", { replace: true });
      } else {
        navigate("/payment/failure", {
          state: {
            message:
              message ||
              "Pago rechazado. Por favor, intente con otro método de pago.",
          },
          replace: true,
        });
      }

      setIsProcessing(false);
    },
    [cardNumber, clearCart, navigate, items, totalPrice]
  );

  if (!totalPrice || items.length === 0) {
    return (
      <Padding $y={4}>
        <Wrapper $textAlign="center">
          <Text as="h2" $size={1.8} $color="var(--color-text-main)">
            Redirigiendo al Carrito...
          </Text>
          <Text
            as="p"
            $color="var(--color-text-secondary)"
            style={{ marginTop: "calc(var(--space-unit) * 0.5)" }}
          >
            No hay artículos en el carrito para procesar el pago.
          </Text>
        </Wrapper>
      </Padding>
    );
  }

  return (
    <StyledPaymentContainer>
      <Padding $x={2.5} $y={2.5}>
        <Text
          as="h2"
          $size={2.4}
          $weight="bold"
          $color="var(--color-text-main)"
          style={{ marginBottom: "calc(var(--space-unit) * 2)" }}
        >
          Finalizar{" "}
          <Text as="span" $color="var(--color-accent-blue)">
            Pago
          </Text>
        </Text>
        <form onSubmit={handlePaymentSubmit}>
          <Column $gapY={1.5}>
            <Text
              as="p"
              $size={1.2}
              $weight="bold"
              $color="var(--color-text-main)}"
            >
              Total a pagar: {formatCLP(totalPrice)}
            </Text>
            <Field>
              <StyledLabel htmlFor="cardNumber">Número de Tarjeta</StyledLabel>
              <StyledInput
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                maxLength={19}
                pattern="[0-9\s-]{16,19}"
              />
            </Field>
            <Field>
              <StyledLabel htmlFor="cardHolder">Nombre del Titular</StyledLabel>
              <StyledInput
                id="cardHolder"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Nombre Apellido"
                required
              />
            </Field>
            <Row $gap={1.5}>
              <Column style={{ flex: 1 }}>
                <Field>
                  <StyledLabel htmlFor="expiryDate">
                    Fecha de Vencimiento
                  </StyledLabel>
                  <StyledInput
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/AA"
                    required
                    maxLength={5}
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                  />
                </Field>
              </Column>
              <Column style={{ flex: 1 }}>
                <Field>
                  <StyledLabel htmlFor="cvv">CVV</StyledLabel>
                  <StyledInput
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="XXX"
                    required
                    maxLength={4}
                    pattern="[0-9]{3,4}"
                  />
                </Field>
              </Column>
            </Row>
            {paymentError && (
              <Text
                $color="var(--color-danger)"
                $size={0.95}
                style={{ marginTop: "calc(var(--space-unit) * 0.5)" }}
              >
                {paymentError}
              </Text>
            )}
            <Row
              $justify="end"
              $gap={1}
              style={{ marginTop: "calc(var(--space-unit) * 1.5)" }}
            >
              <Button
                type="button"
                onClick={() => navigate("/cart")}
                $background="var(--color-surface)"
                $color="var(--color-text-secondary)"
                $hover={{
                  background: "var(--color-bg-alt)",
                  color: "var(--color-text-main)",
                }}
                style={{ border: "1px solid var(--color-border)" }}
                disabled={isProcessing}
              >
                Volver al Carrito
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Confirmar Pago"}
              </Button>
            </Row>
          </Column>
        </form>
      </Padding>
    </StyledPaymentContainer>
  );
};

export default PaymentPageModule;
