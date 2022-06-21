// import React, { Component } from "react";
// import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
// const client = new ApolloClient({
//   uri: "localhost:4000",
//   cache: new InMemoryCache(),
// });

// const GET_CATEGORIES = gql`
//   query {
//     categories {
//       category {
//         name
//       }
//     }
//   }
// `;

// // export const useCategories = () => {
// //   const { error, loading, data } = useQuery(GET_CATEGORIES);
// //   return {
// //     error,
// //     data,
// //     loading,
// //   };
// // };

// export default class GetTitles extends Component {
//   render() {
//     // const { error, data, loading } = useCategories();
//     // if (data) console.log(data);
//     return <div>GetTitles</div>;
//   }
// }
