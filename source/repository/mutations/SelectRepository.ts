import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ToggleSelectedRepositoryVariables, ToggleSelectedRepositoryResponse } from '../../Types';
const SelectRepository = gql`
mutation($id: ID!, $isSelected: Boolean!) {
    ToggleSelectRepository(id: $id, isSelected: $isSelected) @client {
      id
      isSelected
      __typename
    }
  }
  `;

export class SelectRepositoryComponent extends Mutation<ToggleSelectedRepositoryResponse, ToggleSelectedRepositoryVariables> { }

export default SelectRepository;