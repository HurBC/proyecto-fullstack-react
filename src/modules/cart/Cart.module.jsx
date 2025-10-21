import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Column } from "../../shared/ui/layout/Column";
import { formatCLP } from "../../shared/_utils";
import { Row } from "../../shared/ui/layout/Row";
import Button from "../../shared/components/Button";
import Wrapper from "../../shared/ui/layout/Wrapper";
import { useCart } from "../../shared/providers/CartProvider";
import { useNavigate } from "react-router-dom";
import { Padding } from "../../shared/ui/Padding";
import { Text } from "../../shared/ui/Text";

const StyledCartContainer = styled(Wrapper)`
  max-width: 880px;
  margin: 2.5rem auto;
  background: var(--gradient-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const StyledCartItemRow = styled(Row)`
  padding: calc(var(--space-unit) * 1) calc(var(--space-unit) * 0.5);
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  gap: calc(var(--space-unit) * 1.5);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: calc(var(--space-unit) * 1.5) calc(var(--space-unit) * 1);
  }
`;

const StyledThumb = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: var(--color-bg-alt);
  flex-shrink: 0;
`;

const StyledQtyInput = styled.input`
  width: 70px;
  padding: calc(var(--space-unit) * 0.6) calc(var(--space-unit) * 0.8);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text-main);
  font-size: 0.95rem;
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

const StyledSummaryRow = styled(Row)`
  margin-top: calc(var(--space-unit) * 2);
  padding-top: calc(var(--space-unit) * 1.5);
  border-top: 1px solid var(--color-border);
`;

const Cart = () => {
  const { items, removeItem, clearCart, totalPrice, updateItemQuantity } =
    useCart();
  const navigate = useNavigate();

  const onRemove = useCallback(
    (code) => {
      removeItem(code);
    },
    [removeItem]
  );

  const onQuantityChange = useCallback(
    (code, e) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0) {
        updateItemQuantity(code, v);
      }
    },
    [updateItemQuantity]
  );

  const onClear = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const handleCheckout = useCallback(() => {
    if (items.length === 0 || totalPrice === 0) {
      alert(
        "Tu carrito está vacío o el total es $0. No se puede proceder al pago."
      );
      return;
    }

    navigate("/payment", { state: { totalPrice, items } });
  }, [navigate, items, totalPrice]);

  const cartItemsJSX = useMemo(
    () =>
      items.map((it) => (
        <StyledCartItemRow key={`cart_${it.code}`} $wrap={true}>
          <StyledThumb src={it.image} alt={it.name} />
          <Column style={{ flex: 1, minWidth: "150px" }} $gapY={0.3}>
            <Text
              as="h4"
              $size={1.1}
              $weight="bold"
              $color="var(--color-text-main)}"
            >
              {it.name}
            </Text>
            <Text $color="var(--color-text-secondary)" $size={0.9}>
              Precio unitario: {formatCLP(it.price)}
            </Text>
            <Text $color="var(--color-text-muted)" $size={0.9}>
              Subtotal: <strong>{formatCLP(it.price * it.quantity)}</strong>
            </Text>
          </Column>
          <Row
            $gap={0.8}
            $alignItems="center"
            style={{ flexShrink: 0, marginTop: "auto" }}
          >
            <StyledQtyInput
              type="number"
              min={0}
              value={it.quantity}
              onChange={(e) => onQuantityChange(it.code, e)}
            />
            <Button
              onClick={() => onRemove(it.code)}
              $background="var(--color-danger)"
              $hover={{ background: "var(--color-danger-darker, #d60000)" }}
              style={{
                padding:
                  "calc(var(--space-unit) * 0.6) calc(var(--space-unit) * 1)",
              }}
            >
              Eliminar
            </Button>
          </Row>
        </StyledCartItemRow>
      )),
    [items, onQuantityChange, onRemove]
  );

  return (
    <StyledCartContainer>
      <Padding $x={2.5} $y={2.5}>
        <Text
          as="h2"
          $size={2.4}
          $weight="bold"
          $color="var(--color-text-main)"
          style={{ marginBottom: "calc(var(--space-unit) * 2)" }}
        >
          Tu{" "}
          <Text as="span" $color="var(--color-accent-blue)">
            Carrito
          </Text>
        </Text>
        {items.length === 0 ? (
          <Column
            $alignItems="center"
            $gapY={1.5}
            style={{ padding: "calc(var(--space-unit) * 3) 0" }}
          >
            <Text
              as="p"
              $size={1.2}
              $color="var(--color-text-muted)"
              $align="center"
            >
              Tu carrito de compras está vacío. ¡Es hora de explorar algunos
              juegos!
            </Text>
            <Button onClick={() => navigate("/products")}>Ver Productos</Button>
          </Column>
        ) : (
          <Column>
            <Column $gapY={1}>{cartItemsJSX}</Column>
            <StyledSummaryRow
              $justify="between"
              $alignItems="center"
              $wrap={true}
              $gap={2}
            >
              <Text
                as="h3"
                $size={1.8}
                $weight="bold"
                $color="var(--color-accent-green)"
              >
                Total: {formatCLP(totalPrice)}
              </Text>
              <Row $gap={1} $alignItems="center" style={{ flexShrink: 0 }}>
                <Button
                  onClick={onClear}
                  $background="var(--color-surface)"
                  $color="var(--color-text-secondary)"
                  $hover={{
                    background: "var(--color-bg-alt)",
                    color: "var(--color-text-main)",
                  }}
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  Vaciar Carrito
                </Button>
                <Button onClick={handleCheckout}>Pagar Ahora</Button>
              </Row>
            </StyledSummaryRow>
          </Column>
        )}
      </Padding>
    </StyledCartContainer>
  );
};

export default Cart;
