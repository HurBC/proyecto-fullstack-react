import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../shared/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Padding } from "../../shared/ui/Padding";
import { Text } from "../../shared/ui/Text";
import { Row } from "../../shared/ui/layout/Row";
import Wrapper from "../../shared/ui/layout/Wrapper";

const StyledRegisterContainer = styled(Wrapper)`
  max-width: 520px;
  margin: 2rem auto;
  /* Usamos var(--gradient-surface) para un aspecto de tarjeta premium */
  background: var(--gradient-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border); /* Un borde sutil para definir la tarjeta */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra para profundidad */
`;

const Field = styled.div`
  margin-bottom: var(--space-unit); /* Usa la unidad de espacio global */
`;

const StyledLabel = styled(Text).attrs({ as: "label" })`
  display: block; /* Asegura que la etiqueta esté en su propia línea */
  margin-bottom: calc(
    var(--space-unit) * 0.3
  ); /* Espacio entre label e input */
  color: var(
    --color-text-secondary
  ); /* Color de texto secundario para labels */
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  /* Utiliza la unidad de espacio global para el padding */
  padding: calc(var(--space-unit) * 0.75) calc(var(--space-unit) * 1);
  border-radius: 6px;
  border: 1px solid var(--color-border); /* Borde consistente */
  background: var(
    --color-bg-alt
  ); /* Fondo ligeramente más oscuro que el de la superficie */
  color: var(--color-text-main);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent-blue); /* Resalta el borde al enfocar */
    box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.3); /* Sombra suave para enfoque */
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const StyledButton = styled.button`
  padding: calc(var(--space-unit) * 0.75) calc(var(--space-unit) * 1.5);
  border-radius: 6px;
  cursor: pointer;
  border: none;
  background: var(--gradient-accent); /* Usa el gradiente de acento */
  color: var(--color-text-main); /* Texto principal para los botones */
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  flex-shrink: 0; /* Evita que el botón se encoja */

  &:hover {
    background: var(--gradient-accent-hover); /* Gradiente de hover */
    box-shadow: 0 2px 8px rgba(42, 255, 92, 0.2),
      0 2px 8px rgba(41, 121, 255, 0.2);
    transform: translateY(-1px); /* Efecto sutil de levantamiento */
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-border);
  }
`;

const RegisterModule = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const res = await register({ name, email, password });

    if (!res.ok) setError(res.message || "Error al registrar");
    else navigate("/home", { replace: true });
  };

  return (
    <StyledRegisterContainer>
      <Padding $x={2} $y={2.5}>
        {" "}
        <Text
          as="h2"
          $size={1.8}
          $weight="bold"
          $color="var(--color-text-main)"
          $align="center"
          style={{ marginBottom: "calc(var(--space-unit) * 1.5)" }}
        >
          Crear cuenta
        </Text>
        <form onSubmit={onSubmit}>
          <Field>
            <StyledLabel htmlFor="name">Nombre</StyledLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </Field>
          <Field>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="tu@email.com"
            />
          </Field>
          <Field>
            <StyledLabel htmlFor="password">Contraseña</StyledLabel>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </Field>
          {error && (
            <Text
              $color="var(--color-danger)"
              $size={0.9}
              style={{
                marginTop: "calc(var(--space-unit) * 0.5)",
                marginBottom: "calc(var(--space-unit) * 1)",
              }}
            >
              {error}
            </Text>
          )}
          <Row
            $justify="end"
            style={{ marginTop: "calc(var(--space-unit) * 1.5)" }}
          >
            {" "}
            <StyledButton type="submit">Crear cuenta</StyledButton>
          </Row>
        </form>
      </Padding>
    </StyledRegisterContainer>
  );
};

export default RegisterModule;
