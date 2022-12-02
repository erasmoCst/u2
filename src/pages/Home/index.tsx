import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Menu } from "./../../components/Menu";
import { Footer } from "./../../components/Footer";
import { Card } from "./../../components/Card";
import axios from "axios";

interface interfaceProducts {
  id: string;
  id_categoria: number;
  nome: string;
  valor: string;
  promo: string;
  imagemg: string;
  imagemp: string;
}

export const Home = () => {
  const [products, setProducts] = useState<Array<interfaceProducts>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <>
      <Menu />
      <Container>
        <h2>Produtos em Destaque</h2>
        <div className="row justify-content-center text-center">
          {products.map((product) => (
            <Card
              id={product.id}
              key={product.id}
              img={
                "https://raw.githubusercontent.com/profchines/imagensProjetoU2/main/" +
                product.imagemp
              }
              title={product.nome}
              price={product.valor}
              sale={product.promo}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};
