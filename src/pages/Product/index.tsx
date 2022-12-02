import axios from "axios";
import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Footer } from "./../../components/Footer";
import { Card } from "./../../components/Card";
import { Container } from "react-bootstrap";

interface interfaceProducts {
    id: string;
    id_categoria: number;
    nome: string;
    valor: string;
    promo: string;
    promoNum: string;
    imagemg: string;
    imagemp: string;
}

export const Product = () => {
    /*Cria "Rotas" e exporta*/
    const { id } = useParams();
    const [product, setProduct] = useState<interfaceProducts>();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
            .get("http://localhost:3001/products?id=" + id)
            .then((response) => {
                //console.log(response.data);
                setProduct(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function onSubmit(e: any) {
        e.preventDefault(); 
        if(product){
            let qtd = e.target.qtd.value;
            let obj = {
                ...product,
                qtd: qtd,
                total: Number(product.promoNum) * qtd
            }

            let lsCart = localStorage.getItem("@u2:cart");
            let cart:any = null;

            if(typeof lsCart === "string"){
                cart = JSON.parse(lsCart);
            }
            
            if(cart){
                cart.push(obj);

                localStorage.setItem("@u2:cart", JSON.stringify(cart));
            } else{
                localStorage.setItem("@u2:cart", JSON.stringify([obj]));
            }

            navigate("/cart");

        }
    }

    return (
        <>
            <Menu />

            <Container style={{marginTop: 20, marginBottom: 20 }}>
                {product ? (
                    <>
                        <h2>Products</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    className="w-100"
                                    src={
                                        "https://raw.githubusercontent.com/profchines/imagensProjetoU2/main/" +
                                        product.imagemg
                                    }
                                />
                            </div>
                            <div className="col-md-8">
                                <h3>{product.nome}</h3>
                                <p style={{ textDecoration: "line-through" }}>
                                    {`R$ ${product.valor}`}
                                </p>

                                <p style={{ fontWeight: "bold", color: "red" }}>
                                    {`R$ ${product.promo}`}
                                </p>

                                <form onSubmit={ onSubmit }>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            name="qtd"
                                            className="form-control"
                                            defaultValue={1}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) 
                : (
                    <h2>No products found </h2>
                )}
            </Container>

            <Footer />
        </>
    );
};
