import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PizzasPage from "./components/PizzasPage.tsx";
import ProfilePage from "./components/ProfilePage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import OrdersPage from "./components/Orders.tsx";
import CartPage from "./components/CartPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/pizzas" element={<PizzasPage />} />
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)

