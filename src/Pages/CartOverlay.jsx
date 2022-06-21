import React, { Component } from "react";
import { AllConsumer } from "../AllProvider";
import "./styles.scss";

export default class CartOverlay extends Component {
  render() {
    return (
      <AllConsumer>
        {(props) => {
          const { cartOverlay, toggleCartOverlay, cartItems, currentCurrency } =
            props;
          return (
            <div>
              {cartOverlay && (
                <>
                  <div className="modal">
                    <div onClick={toggleCartOverlay} className="overlay"></div>
                    <div className="modal-content">
                      <h2>
                        <strong>My Bag</strong>, {cartItems.length} Items
                      </h2>
                      {cartItems.map((item) => (
                        <>
                          <h4>{item.name}</h4>
                          <h4>
                            {item.prices
                              .filter(
                                (price) =>
                                  price.currency.label === currentCurrency
                              )
                              .map((item) => (
                                <strong key={item.amount}>
                                  {item.currency.symbol}
                                  {item.amount}
                                </strong>
                              ))}
                          </h4>
                          <img src={item.gallery[0]}></img>
                        </>
                      ))}
                      <button
                        className="close-modal"
                        onClick={toggleCartOverlay}
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        }}
      </AllConsumer>
    );
  }
}
