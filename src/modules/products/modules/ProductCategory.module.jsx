// src/modules/products/ProductCategoryModule.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductsRepo from "../../../shared/repositories/products";
import { Padding } from "../../../shared/ui/Padding";
import { Text } from "../../../shared/ui/Text";
import { Grid } from "../../../shared/ui/layout/Grid";
import { Column } from "../../../shared/ui/layout/Column";
import Wrapper from "../../../shared/ui/layout/Wrapper";
import { Button } from "../../../shared/components/Button";
import Product from "../components/Product";

const ProductCategoryModule = () => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryName = decodeURIComponent(categoryParam || "");

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const categoryProducts = ProductsRepo.getProductsByCategory(categoryName);
      if (categoryProducts && categoryProducts.length > 0) {
        setProducts(categoryProducts);
      } else {
        setProducts([]);
        setError(
          `No se encontraron productos para la categoría "${categoryName}".`
        );
      }
    } catch (err) {
      setError("Hubo un error al cargar los productos de la categoría.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  if (loading) {
    return (
      <Padding $y={4}>
        <Wrapper $textAlign="center">
          <Text as="h2" $size={1.8} $color="var(--color-text-main)">
            Cargando productos...
          </Text>
        </Wrapper>
      </Padding>
    );
  }

  return (
    <Padding $y={3}>
      <Wrapper>
        <Padding $x={2.5} $y={2}>
          <Wrapper
            $textAlign="start"
            style={{ marginBottom: "calc(var(--space-unit) * 2)" }}
          >
            <Text
              as="h1"
              $size={2.4}
              $weight="bold"
              $color="var(--color-text-main)"
            >
              Categoría:{" "}
              <Text as="span" $color="var(--color-accent-blue)">
                {categoryName}
              </Text>
            </Text>
            {error && (
              <Text
                $color="var(--color-danger)"
                $size={1}
                style={{ marginTop: "calc(var(--space-unit) * 0.5)" }}
              >
                {error}
              </Text>
            )}
          </Wrapper>
          {products.length === 0 && !error ? (
            <Column
              $alignItems="center"
              $gapY={1.5}
              style={{ padding: "calc(var(--space-unit) * 2)" }}
            >
              <Text
                as="p"
                $color="var(--color-text-muted)"
                $align="center"
                $size={1.1}
              >
                No hay productos disponibles en esta categoría por el momento.
              </Text>
              <Button onClick={() => navigate("/home")}>
                Volver a la tienda
              </Button>
            </Column>
          ) : (
            <Grid
              $gap={2.5}
              $justify="center"
              $templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            >
              {products.map((product) => (
                <Product key={`product_${product.code}`} product={product} />
              ))}
            </Grid>
          )}
        </Padding>
      </Wrapper>
    </Padding>
  );
};

export default ProductCategoryModule;
