import RepositoryFragment from '../../repository/fragments/RepositoryFragment';
import gql from 'graphql-tag';

/**
 * Queries current user as "viewer" and repositories
 *
 * @see {RepositoryFragment} - referenced in this query
 */
const GetUserQuery = gql`
  {
    viewer {
    login,
    name,
    url,
    bio,
    company
    repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        ) {
            edges {
                node {
                    ...repository
                }
            }
        }
    }
  }

  ${RepositoryFragment}
`;

export default GetUserQuery;