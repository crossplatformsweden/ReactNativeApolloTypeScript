import gql from 'graphql-tag';

/**
 * Selects fields from the Repository node as a fragment called "repository" which can then be referenced in queries
 * @example
 * ```
 * import RepositoryFragment from '../../fragments/RepositoryFragment';
 * const userQuery = gql`
 *   {
 *     viewer {
 *     login,
 *     name,
 *     repositories(
 *         first: 5
 *         orderBy: { direction: DESC, field: STARGAZERS }
 *         ) {
 *             edges {
 *                 node {
 *                     ...repository
 *                 }
 *             }
 *         }
 *     }
 *   }
 *
 *   ${RepositoryFragment}
 * `;
 * ```
 */
const RepositoryFragment = gql`
fragment repository on Repository {
  id
  name
  url
  descriptionHTML
  primaryLanguage {
    name
  }
  owner {
    login
    url
  }
  stargazers {
    totalCount
  }
  viewerHasStarred
  watchers {
    totalCount
  }
  viewerSubscription
}
`;

export default RepositoryFragment;