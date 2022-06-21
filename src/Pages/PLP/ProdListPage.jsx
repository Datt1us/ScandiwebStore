import React, { Component } from "react";
import "./styles.scss";
import { AllConsumer } from "../../AllProvider";
import { Link } from "react-router-dom";

export default class ProdListPage extends Component {
  render() {
    return (
      <AllConsumer>
        {(props) => {
          const {
            addToCart,
            filterMethod,
            menuCategories,
            initialFetchFunction,
            handlePDP,
            onAdd,
            getProduct,
            currentCurrency,
          } = props;

          return (
            <div>
              <h1>
                {menuCategories !== null //Category Name, .map() function because there will only be 1 name in it each time.
                  ? menuCategories.map((i) => i.name.toUpperCase())
                  : "All"}
              </h1>
              <div className="products-list">
                {menuCategories.map((category) =>
                  category.products.map((product) => (
                    <div
                      key={product.id}
                      className="product-wrapper"
                      style={{ zindex: "0", overflow: "hidden" }}
                    >
                      <Link
                        to="/prod"
                        onClick={() =>
                          // getProduct({ variables: { id: product.id } })
                          handlePDP(product)
                        }
                      >
                        <img
                          className="image-style"
                          src={product.gallery[0]}
                        ></img>
                      </Link>
                      <span>
                        <ul className="product-specs">
                          <li>{product.name}</li>
                          <li>
                            <strong>
                              {product.prices
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
                            </strong>
                          </li>
                        </ul>
                        {/* <div          // THIS SERVES THE PURPOSE OF ADDING html AS html TO DESCRIPTION
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        /> */}
                        <button
                          style={{ zindex: "10" }}
                          onClick={() => onAdd(product)}
                        >
                          AddToCart
                        </button>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        }}
      </AllConsumer>
    );
  }
}
