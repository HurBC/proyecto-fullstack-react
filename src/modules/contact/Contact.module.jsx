import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { Text } from "../../shared/ui/Text";
import { Padding } from "../../shared/ui/Padding";
import { Column } from "../../shared/ui/layout/Column";
import { Row } from "../../shared/ui/layout/Row";
import Wrapper from "../../shared/ui/layout/Wrapper";
import { Button } from "../../shared/components/Button";

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

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px; /* Altura mínima para el área de texto */
  padding: calc(var(--space-unit) * 0.75) calc(var(--space-unit) * 1);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text-main);
  font-size: 1rem;
  resize: vertical; /* Permite redimensionar verticalmente */
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

const StyledContactContainer = styled(Wrapper)`
  max-width: 720px; /* Ancho un poco más grande para el formulario */
  margin: 2.5rem auto;
  background: var(--gradient-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ContactModule = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El formato del email no es válido.";
    }
    if (!subject.trim()) newErrors.subject = "El asunto es obligatorio.";
    if (!message.trim()) newErrors.message = "El mensaje es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, subject, message]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSuccessMessage(null);
      setErrors({});
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const simulateError = false;
        if (simulateError) {
          throw new Error("Error simulado al enviar el mensaje.");
        }

        setSuccessMessage(
          "¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad."
        );
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (err) {
        setErrors({
          form:
            err.message || "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, subject, message, validateForm]
  );

  return (
    <StyledContactContainer>
      <Padding $x={2.5} $y={2.5}>
        <Text
          as="h1"
          $size={2.8}
          $weight="bold"
          $color="var(--color-text-main)"
          $align="center"
          style={{ marginBottom: "calc(var(--space-unit) * 1.5)" }}
        >
          Contacto{" "}
          <Text as="span" $color="var(--color-accent-blue)">
            Level UP
          </Text>
        </Text>
        <Text
          as="p"
          $size={1.1}
          $color="var(--color-text-secondary)"
          $align="center"
          style={{
            marginBottom: "calc(var(--space-unit) * 2.5)",
            maxWidth: "600px",
            margin: "0 auto calc(var(--space-unit) * 2.5)",
          }}
        >
          ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Rellena el
          siguiente formulario y nos pondremos en contacto contigo lo antes
          posible.
        </Text>
        <form onSubmit={handleSubmit}>
          <Column $gapY={1.2}>
            <Field>
              <StyledLabel htmlFor="name">Tu Nombre</StyledLabel>
              <StyledInput
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                disabled={isSubmitting}
              />
              {errors.name && (
                <Text
                  $color="var(--color-danger)"
                  $size={0.85}
                  style={{ marginTop: "calc(var(--space-unit) * 0.3)" }}
                >
                  {errors.name}
                </Text>
              )}
            </Field>
            <Field>
              <StyledLabel htmlFor="email">Tu Email</StyledLabel>
              <StyledInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@ejemplo.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <Text
                  $color="var(--color-danger)"
                  $size={0.85}
                  style={{ marginTop: "calc(var(--space-unit) * 0.3)" }}
                >
                  {errors.email}
                </Text>
              )}
            </Field>
            <Field>
              <StyledLabel htmlFor="subject">Asunto</StyledLabel>
              <StyledInput
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Motivo de tu consulta"
                disabled={isSubmitting}
              />
              {errors.subject && (
                <Text
                  $color="var(--color-danger)"
                  $size={0.85}
                  style={{ marginTop: "calc(var(--space-unit) * 0.3)" }}
                >
                  {errors.subject}
                </Text>
              )}
            </Field>
            <Field>
              <StyledLabel htmlFor="message">Tu Mensaje</StyledLabel>
              <StyledTextArea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <Text
                  $color="var(--color-danger)"
                  $size={0.85}
                  style={{ marginTop: "calc(var(--space-unit) * 0.3)" }}
                >
                  {errors.message}
                </Text>
              )}
            </Field>
          </Column>
          {successMessage && (
            <Text
              $color="var(--color-success)"
              $size={1}
              $align="center"
              style={{
                marginTop: "calc(var(--space-unit) * 1.5)",
                marginBottom: "calc(var(--space-unit) * 1)",
              }}
            >
              {successMessage}
            </Text>
          )}
          {errors.form && (
            <Text
              $color="var(--color-danger)"
              $size={1}
              $align="center"
              style={{
                marginTop: "calc(var(--space-unit) * 1.5)",
                marginBottom: "calc(var(--space-unit) * 1)",
              }}
            >
              {errors.form}
            </Text>
          )}
          <Row
            $justify="end"
            style={{ marginTop: "calc(var(--space-unit) * 2)" }}
          >
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>
          </Row>
        </form>
      </Padding>
    </StyledContactContainer>
  );
};

export default ContactModule;
