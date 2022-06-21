import React, { Component } from "react";
import { client } from "./index";
import { gql } from "@apollo/client";

export const AllContext = React.createContext();
export const AllConsumer = AllContext.Consumer;

export class AllProvider extends Component {
  state = {
    cartItems: [],
    categories: [],
    menuCategories: [],
    currentProduct: [],
    currencies: [],
    currentCurrency: "USD",
    totalItemsInCart: null,
    cartOverlay: false,
  };
  toggleCartOverlay = () => {
    this.setState({ cartOverlay: !this.state.cartOverlay });
  };
  onAdd = (product) => {
    let tempCart = [...this.state.cartItems];
    let tempItem = tempCart.find((item) => item.id === product.id);

    //  Item is NOT in the CART already
    if (!tempItem) {
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, { ...product, qty: 1 }],
      }));

      // Item IS in the cart
    } else {
      const cartData = this.state.cartItems.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      );
      this.setState((prev) => ({ ...prev, cartItems: cartData }));
    }
  };
  onDecrement = (product) => {
    let tempCart = [...this.state.cartItems];
    let tempItem = tempCart.find((item) => item.id === product.id);
    if (tempItem.qty > 1) {
      // FOR "-1" THE ITEM QUANTITY
      const cartData = this.state.cartItems.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty - 1 } : x
      );
      this.setState({ cartItems: cartData });
    } else {
      // FOR REMOVING THE ITEM ENTIRELY
      const cartData = this.state.cartItems.filter((x) => product.id !== x.id);
      this.setState({ cartItems: cartData });
    }
  };
  handlePDP = (product) => {
    this.setState({ currentProduct: product });
  };
  onCurrencyChange = (val) => {
    this.setState(
      (prevState) => ({ ...prevState, currentCurrency: val }),
      () => console.log(this.state.currentCurrency)
    );
  };

  getProduct = (variables) =>
    client.query({
      query: gql`
        query GET_PRODUCT($id: String!) {
          product(id: $id) {
            name
            category
            id
          }
        }
      `,
    });
  // .then((result) => console.log(result));

  filterByCategory = (categoryName) => {
    const filtered = this.state.categories.filter(
      (menuCategory) => menuCategory.name === `${categoryName}`
    );
    this.setState({ menuCategories: filtered });
  };

  componentDidMount() {
    client
      .query({
        query: gql`
          query GET_STORE {
            categories {
              name
              products {
                name
                id
                gallery
                category
                description
                attributes {
                  name
                  items {
                    value
                    displayValue
                    id
                  }
                }
                prices {
                  amount
                  currency {
                    label
                    symbol
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) =>
        this.setState({
          categories: result.data.categories,
          menuCategories: result.data.categories.filter(
            (cat) => cat.name === "all"
          ),
        })
      );

    client
      .query({
        query: gql`
          query GET_CURRENCY {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => this.setState({ currencies: result.data.currencies }));
  }
  render() {
    const {
      categories,
      cartItems,
      currencies,
      menuCategories,
      currentProduct,
      currentCurrency,
      cartOverlay,
    } = this.state;
    const {
      toggleCartOverlay,
      filterByCategory,
      onCurrencyChange,
      getProduct,
      onAdd,
      onDecrement,
      handlePDP,
    } = this;
    return (
      <AllContext.Provider
        value={{
          categories,
          cartItems,
          menuCategories,
          currentProduct,
          currencies,
          currentCurrency,
          cartOverlay,
          filterByCategory,
          getProduct,
          handlePDP,
          onCurrencyChange,
          onAdd,
          onDecrement,
          toggleCartOverlay,
        }}
      >
        {this.props.children}
      </AllContext.Provider>
    );
  }
}

// addOne = () => {
//   this.setState((prevState) => {
//     return { count: prevState.count + 1 };
//   });
// };
// minusOne = () => {
//   if (this.state.count !== 0)
//     this.setState((prevState) => {
//       return { count: prevState.count - 1 };
//     });
// };
