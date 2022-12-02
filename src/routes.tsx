import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Categorie } from "./pages/Categorie";
import { Product } from "./pages/Product";

export const Rotas = () => {/*Cria "Rotas" e exporta*/
    return(
        <BrowserRouter>{/*ambiente*/}
            <Routes>{/*Rotas*/}
                <Route path="/" element={<Home/>}/>{/*Qual a rota --> '/' é a rota raiz(pagina principal)*/}
                <Route path="cart" element={<Cart/>}/>{/* Rota "Cart"*/}
                <Route path="categories/:id" element={<Categorie/>}/>{/* Rota "Cart"*/}
                <Route path="product/:id" element={<Product/>}/>{/* Rota "Cart"*/}
            </Routes>
        </BrowserRouter>

    )

} 