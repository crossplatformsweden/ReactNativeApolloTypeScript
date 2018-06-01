import gql from 'graphql-tag';

/**
 * GraphQL mutation to add a star for the specified repository "id"
 */
export const StarRepositoryMutation = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

/**
 * GraphQL mutation to add a star for the specified repository "id"
 */
export const RemoveRepositoryStarMutation = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export default StarRepositoryMutation;