import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Menu } from "../../components/Menu";
import { Footer } from "./../../components/Footer";

interface interfaceProducts {
  id: string,
  id_categoria: number,
  nome: string,
  valor: string,
  promo: string,
  promoNum: string,
  qtd: string,
  total: number,
  imagemg: string,
  imagemp: string,
}

export const Cart = () => {
    const [dataCart, setDataCart] = useState<Array<interfaceProducts>>([]);

    useEffect(() => {
        let lsCart = localStorage.getItem("@u2:cart");
        let cart: any = null;

        if (typeof lsCart === "string") {
            cart = JSON.parse(lsCart);
        }

        if (cart) {
            setDataCart(cart);
        }
    }, []);

    return (
        <>
            <Menu />

            <Container style={{ marginTop: 20, marginBottom: 40 }}>
                <h2>Shopping Cart</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Product</td>
                            <td>Qtd.</td>
                            <td>Unit Value</td>
                            <td>Total Value</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCart.map((product) => (
                            <tr key={product.id}>
                                <td width={600}>{product.nome}</td>
                                <td>{product.qtd}</td>
                                <td>{product.promo}</td>
                                <td>{product.total}</td>
                                <td>Action</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>

            <Footer />
        </>
    );
};
