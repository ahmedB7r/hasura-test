import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          alert(message);
          return message;
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        alert(networkError.message);
      }
    }),

    new HttpLink({
      uri: "https://test-b7r.herokuapp.com/v1/graphql"
    })
  ]),
  cache
});

export default client;
