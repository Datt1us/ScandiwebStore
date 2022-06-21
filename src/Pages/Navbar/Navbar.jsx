import React, { Component } from "react";
import "./styles.scss";
import { FaShoppingCart } from "react-icons/fa";
import { AllConsumer } from "../../AllProvider";
import { Link } from "react-router-dom";
import CartOverlay from "../CartOverlay";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AllConsumer>
        {(props) => {
          const {
            categories,
            filterByCategory,
            cartItems,
            currencies,
            onCurrencyChange,
            toggleCartOverlay,
          } = props;
          return (
            <div className="navbar-container">
              <Link to="/">
                <h2>PLP</h2>
              </Link>
              <Link to="/prod">
                <h2>PDP</h2>
              </Link>
              <Link to="/cart">
                <h2>CART</h2>
              </Link>
              <ul className="categories-container">
                {categories.map((category) => {
                  const upperCase = category.name.toUpperCase();
                  return (
                    <div
                      className="categories-item"
                      key={category.name}
                      onClick={() => filterByCategory(category.name)}
                    >
                      <strong>{upperCase}</strong>
                    </div>
                  );
                })}
              </ul>
              <div>Logo</div>
              <div className="right-side-container">
                <select
                  onChange={(ev) => onCurrencyChange(ev.target.value)}
                  style={{
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {
                    // CURRENCY CHANGER
                    currencies.map((currency) => (
                      <option key={currency.label} value={currency.label}>
                        {currency.symbol + " "}
                        {currency.label}
                      </option>
                    ))
                  }
                </select>
                <FaShoppingCart
                  style={{ fontSize: "1.3rem", cursor: "pointer" }}
                  onClick={() => toggleCartOverlay()}
                ></FaShoppingCart>
                <CartOverlay />
                <h3>{cartItems.length}</h3>
              </div>
            </div>
          );
        }}
      </AllConsumer>
    );
  }
}
