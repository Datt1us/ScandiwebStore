import React, { Component } from "react";
import { AllConsumer } from "../../AllProvider";

export default class Cart extends Component {
  render() {
    return (
      <AllConsumer>
        {(props) => {
          const { cartItems, onAdd, onDecrement } = props;

          return (
            <div>
              {cartItems.length === 0 && <h2>Your cart is empty...</h2>}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      style={{
                        border: "none",
                      }}
                    >
                      <img src={item.gallery[0]} alt=""></img>
                      <h1>{item.name}</h1>
                    </div>
                    <div
                      style={{
                        border: "none",
                      }}
                    >
                      {console.log(item.attributes, item.name)}
                      <h3>
                        Cart Total Quantity:{" "}
                        {cartItems.map((cartItem) => console.log(cartItem.qty))}
                      </h3>
                      {item.attributes.map(
                        (attribute) =>
                          attribute.name === "Color" && (
                            <div key={attribute.name}>
                              {attribute.items.map((item) => (
                                <button
                                  key={item.id}
                                  style={{
                                    cursor: "pointer",
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: `${item.value}`,
                                    margin: "3px",
                                    padding: "0",
                                    border: `${
                                      item.displayValue === "White"
                                        ? "1px solid grey"
                                        : "none"
                                    }`,
                                  }}
                                  // onClick={}
                                ></button>
                              ))}
                            </div>
                          )
                      )}
                      <button onClick={() => onAdd(item)}>+</button>
                      <h3>Quantity: {item.qty}</h3>
                      <button onClick={() => onDecrement(item)}>-</button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {}}
                style={{
                  padding: "10px 30px ",
                  border: "none",
                  background: "lightgreen",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  margin: "10px",
                }}
              >
                Order
              </button>
            </div>
          );
        }}
      </AllConsumer>
    );
  }
}
