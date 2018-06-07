import gql from 'graphql-tag';
import { OrganizationResponse, OrganizationVariables } from '../../Types';
import { Query } from 'react-apollo';

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

/**
 * Typed Query component
 */
export class GetOrganizationComponent extends Query<OrganizationResponse, OrganizationVariables> {}

type GetOrganizationQuery = typeof GetOrganizationQuery;

export default GetOrganizationQuery;