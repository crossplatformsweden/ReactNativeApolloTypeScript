import gql from 'graphql-tag';
const SelectRepository = gql`
mutation($id: ID!, $isSelected: Boolean!) {
    toggleSelectRepository(id: $id, isSelected: $isSelected) @client
  }
  `;
export default SelectRepository;