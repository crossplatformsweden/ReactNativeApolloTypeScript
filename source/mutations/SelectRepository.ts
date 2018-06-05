import gql from 'graphql-tag';
const SelectRepository = gql`
mutation($id: ID!, $isSelected: Boolean!) {
    ToggleSelectRepository(id: $id, isSelected: $isSelected) @client {
      id
      isSelected
      __typename
    }
  }
  `;
export default SelectRepository;