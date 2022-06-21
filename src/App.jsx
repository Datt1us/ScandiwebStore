import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import ProdListPage from "./Pages/PLP/ProdListPage";
import ProdDescPage from "./Pages/PDP/ProdDescPage";
import { AllProvider } from "./AllProvider";
import Cart from "./Pages/Cart/Cart";
import "./App.scss";

export default class App extends Component {
  render() {
    return (
      <div className="site-container">
        <AllProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ProdListPage />} />
            <Route exact path="/prod" element={<ProdDescPage />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </AllProvider>
      </div>
    );
  }
}
