import gql from 'graphql-tag';

/**
 * GraphQL query to get organizations.
 *
 * Takes two parameters: "organization" and "repository"
 */
const GetOrganizationQuery = gql`
query GetOrganization($organization: String!, $repository: String!) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
      url
    }
  }
}
`;

type GetOrganizationQuery = typeof GetOrganizationQuery;

export default GetOrganizationQuery;