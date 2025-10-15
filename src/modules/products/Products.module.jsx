import { useMemo } from "react";
import Product from "./components/Product";
import ProductsRepo from "../../shared/repositories/products";
import { Row } from "../../shared/ui/Row";

const ProductsModule = () => {
  const products = useMemo(
    () => ProductsRepo.products.map((product) => <Product product={product} />),
    []
  );

  return (
    <>
      <h1>Nuestros Productos</h1>
      <Row>{products}</Row>
    </>
  );
}

export default ProductsModule;
