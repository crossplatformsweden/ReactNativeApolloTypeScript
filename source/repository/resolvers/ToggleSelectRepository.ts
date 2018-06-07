
import GetSelectedRepositoryIds from '../queries/GetSelectedRepositoryIds';
import * as Types from '../../Types';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 * Mutation to update selected repository in cache
 * @param _  Parent result from any other resolver (https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e#9d03)
 * @param {ToggleSelectedRepositoryVariables} param1 {@link ToggleSelectedRepositoryVariables}
 * @param {InMemoryCache} param2 {@link InMemoryCache}
 */
const ToggleSelectRepository = (
    _: any,
    { id, isSelected }: Types.ToggleSelectedRepositoryVariables,
    { cache }: { cache: InMemoryCache }
): Types.ToggleSelectedRepositoryVariables => {
    // Get current ids from cache
    let {selectedRepositoryIds} = cache.readQuery({query: GetSelectedRepositoryIds});

    // Add or remove the provided id
    selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter((itemId: string) => itemId !== id)
    : selectedRepositoryIds.concat(id);

    // Update cache
    cache.writeQuery({query: GetSelectedRepositoryIds, data: {selectedRepositoryIds}});

    const result: Types.ToggleSelectedRepositoryResponse = {
        id,
        isSelected: !isSelected,
        __typename: id,
    };

    return result;
};

export type ToggleSelectRepository = typeof ToggleSelectRepository;

export default ToggleSelectRepository;