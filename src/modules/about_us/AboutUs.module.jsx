import styled from "styled-components";

import { Text } from "../../shared/ui/Text";
import { Padding } from "../../shared/ui/Padding";
import { Column } from "../../shared/ui/layout/Column";
import { Grid } from "../../shared/ui/layout/Grid";
import Wrapper from "../../shared/ui/layout/Wrapper";

const StyledAboutUsContainer = styled(Wrapper)`
  max-width: 1024px; /* Un poco más ancho para el contenido de texto */
  margin: 2.5rem auto; /* Centrar y dar espacio */
  background: var(--gradient-surface); /* Fondo con gradiente */
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const StyledCompanyImage = styled.img`
  width: 100%;
  max-width: 600px; /* Ajusta el tamaño de la imagen de la compañía */
  height: auto; /* Mantener la proporción */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  margin: calc(var(--space-unit) * 1.5) auto; /* Centrar y dar espacio */
  display: block; /* Para que margin: auto funcione */
`;

const StyledDeveloperCard = styled(Wrapper)`
  background: var(
    --color-surface
  ); /* Fondo ligeramente diferente para destacar */
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: calc(var(--space-unit) * 1.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const StyledDeveloperImage = styled.img`
  width: 120px; /* Tamaño fijo para la foto del desarrollador */
  height: 120px;
  border-radius: 50%; /* Hacerla circular */
  object-fit: cover;
  border: 3px solid var(--color-accent-blue); /* Borde de acento */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: calc(var(--space-unit));
`;

const AboutUsModule = () => {
  return (
    <StyledAboutUsContainer>
      <Padding $x={3} $y={3}>
        <Text
          as="h1"
          $size={2.8}
          $weight="bold"
          $color="var(--color-text-main)"
          $aling="center"
          style={{ marginBottom: "calc(var(--space-unit) * 2.5)" }}
        >
          Sobre{" "}
          <Text as="span" $color="var(--color-accent-blue)">
            Level-Up Gamer
          </Text>
        </Text>
        <Column $gapY={2.5}>
          <Wrapper $textAlign="start">
            <Text
              as="h2"
              $size={2}
              $weight="bold"
              $color="var(--color-text-main)"
              style={{ marginBottom: "calc(var(--space-unit) * 1)" }}
            >
              Nuestra Misión
            </Text>
            <Text
              as="p"
              $size={1.1}
              $color="var(--color-text-secondary)"
              style={{
                lineHeight: 1.6,
                marginBottom: "calc(var(--space-unit) * 1.5)",
              }}
            >
              En Level-Up Gamer, nos dedicamos a proporcionar productos de alta
              calidad para gamers en todo Chile. Nuestra misión es ofrecer una
              experiencia de compra única y personalizada, con un enfoque en la
              satisfacción del cliente y el crecimiento de la comunidad gamer.
              Desde consolas de última generación hasta accesorios
              personalizados, nuestro compromiso es con la excelencia y la
              pasión por los videojuegos.
            </Text>
            <StyledCompanyImage
              src="/public/img/level-up-team.PNG"
              alt="Equipo Level-Up Gamer"
            />
            <Text
              as="p"
              $size={1.1}
              $color="var(--color-text-secondary)"
              style={{
                lineHeight: 1.6,
                marginTop: "calc(var(--space-unit) * 1.5)",
              }}
            >
              Lanzada hace dos años como respuesta a la creciente demanda
              durante la pandemia, Level-Up Gamer nació con la visión de ser la
              tienda online líder en productos para gamers en Chile. Aunque no
              contamos con una ubicación física, realizamos despachos a todo el
              país, llevando la diversión directamente a tu puerta.
            </Text>
          </Wrapper>
          <Wrapper $textAlign="start">
            <Text
              as="h2"
              $size={2}
              $weight="bold"
              $color="var(--color-text-main)"
              style={{ marginBottom: "calc(var(--space-unit) * 1.5)" }}
            >
              Nuestros Desarrolladores
            </Text>
            <Grid
              $gap={2}
              $templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
              $justify="center"
            >
              <StyledDeveloperCard>
                <StyledDeveloperImage
                  src="/public/img/WIDE_CAT.jpg"
                  alt="Foto Desarrollador Franco Carrasco"
                />
                <Text
                  as="h3"
                  $size={1.4}
                  $weight="bold"
                  $color="var(--color-text-main)"
                  style={{ marginBottom: "calc(var(--space-unit) * 0.3)" }}
                >
                  Franco Carrasco
                </Text>
                <Text
                  as="p"
                  $size={0.95}
                  $color="var(--color-accent-blue)"
                  style={{ marginBottom: "calc(var(--space-unit) * 0.8)" }}
                >
                  Rol: FullStack Developer
                </Text>
                <Text
                  as="p"
                  $size={0.9}
                  $color="var(--color-text-secondary)"
                  style={{ lineHeight: 1.5 }}
                >
                  Masoquista de la programación que prefiere entender como
                  funcionan un lenguaje internamente y que no le gusta quedarse
                  con la misma tecnología siempre, queriendo aprender de varios
                  lenguajes diferentes (Rust, C#, JS, Python, Dart, C++)
                </Text>
              </StyledDeveloperCard>
            </Grid>
          </Wrapper>
        </Column>
      </Padding>
    </StyledAboutUsContainer>
  );
};

export default AboutUsModule;
