import styled from "styled-components";
import Card from "../../../shared/components/Card";

const Wrapper = styled.article`
  padding: 1.5rem;
  max-width: 320px;
  width: 100%;
  display: flex;
  row-gap: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
`;

const ImageWrapper = styled.h3`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  border-radius: 4px;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  flex-grow: 1;
`;

const Title = styled.h3`
  color: var(--color-text-main);
  font-size: 1.6rem;
  margin: 0;
  text-align: center;
`;

const Description = styled.p`
  font-family: "Orbitron", sans-serif;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
`;

const Meta = styled.p`
  font-family: "Orbitron", sans-serif;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
`;

const Price = styled.span`
  font-family: var(--font-heading);
  color: var(--color-accent-green);
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 0 3px rgba(57, 255, 20, 0.3);
`;

const Stock = styled.span`
  font-family: "Orbitron", sans-serif;
  color: var(--color-text-muted);
  font-size: 0.85rem;
`;

const Product = ({
  product: {
    name,
    description,
    // price,
    // stock
  },
}) => {
  return (
    <Card primary title={<Title>{name}</Title>}>
      <p>{description}</p>
    </Card>
  );
};

export default Product;
