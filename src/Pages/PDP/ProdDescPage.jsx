import React, { Component } from "react";
import "./styles.scss";
import { AllConsumer } from "../../AllProvider";

export default class ProdDescPage extends Component {
  render() {
    return (
      <AllConsumer>
        {(props) => {
          const { count, categories, getProduct, currentProduct, onAdd } =
            props;
          return (
            <div className="main-container">
              {currentProduct !== null ? (
                <div
                  style={{ display: "flex", flexWrap: "wrap", flex: "33.3%" }}
                >
                  {currentProduct.name}
                  <button
                    onClick={() => onAdd(currentProduct)}
                    style={{ width: 90, height: 30 }}
                  >
                    Add To Cart
                  </button>
                  {currentProduct.gallery.map((img) => (
                    <img src={img} key={img}></img>
                  ))}
                  <br />
                  <div // THIS SERVES THE PURPOSE OF ADDING html AS html TO DESCRIPTION
                    dangerouslySetInnerHTML={{
                      __html: currentProduct.description,
                    }}
                  />
                </div>
              ) : (
                <div>No Current Product</div>
              )}
            </div>
          );
        }}
      </AllConsumer>
    );
  }
}
