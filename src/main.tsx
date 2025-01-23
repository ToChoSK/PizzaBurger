import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PizzasPage from "./components/PizzasPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/pizzas" element={<PizzasPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)

