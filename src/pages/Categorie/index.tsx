import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";
import { Card } from "../../components/Card";
import { Container } from "react-bootstrap";

interface interfaceProducts {
    id: string;
    id_categoria: number;
    nome: string;
    valor: string;
    promo: string;
    imagemg: string;
    imagemp: string;
}

export const Categorie = () => {
    /*Cria "Rotas" e exporta*/
    const { id } = useParams();
    const [products, setProducts] = useState<Array<interfaceProducts>>([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/products?id_categorie=" + id)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <>
            <Menu />

            <Container>
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
