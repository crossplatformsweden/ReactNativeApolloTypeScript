import gql from 'graphql-tag';

/**
 * Get selected repo ids from cache. Client query
 */
const GetSelectedRepositoryIds = gql`
  query {
    selectedRepositoryIds @client
  }
`;
export type GetSelectedRepositoryIds = typeof GetSelectedRepositoryIds;
export default GetSelectedRepositoryIds;