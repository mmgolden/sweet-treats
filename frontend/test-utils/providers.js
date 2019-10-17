import {
  createApolloErrorProvider,
  createApolloMockedProvider,
  createApolloLoadingProvider,
} from 'apollo-mocked-provider';
import { typeDefs } from './typeDefs';
import { ApolloProvider } from '@apollo/react-hooks';

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs, {
  provider: ApolloProvider,
});
export const ApolloErrorProvider = createApolloErrorProvider({
  provider: ApolloProvider,
});
export const ApolloLoadingProvider = createApolloLoadingProvider({
  provider: ApolloProvider,
});