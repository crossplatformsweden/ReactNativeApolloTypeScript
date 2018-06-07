export enum NavigationConstants {
    /**
     * The login screen
     */
    LOGIN = 'LoginScreen',
    /**
     * The main screen
     */
    MAIN = 'MainScreen',
    /**
     *  The logged out screen
     */
    LOGOUT = 'LogoutScreen',
    /**
     * the map screen
     */
    MAP = 'MapScreen',
    /**
     * The profile screen
     */
    PROFILE = 'ProfileScreen',
}

export interface RepoEdge {
    edges: Array<RepoNode>;
}

export interface Language {
    name: string;
}

export interface Owner {
    login: string;
    url: string;
}

export interface UserCount {
    totalCount: number;
}

export interface RepoNodeItem {
    id: string;
    name: string;
    url: string;
    descriptionHTML: string;
    primaryLanguage: Language;
    owner: Owner;
    stargazers: UserCount;
    viewerHasStarred: boolean;
    watchers: UserCount;
    viewerSubscription: string;
}

export interface RepoNode {
    node: RepoNodeItem;
}

export interface Starrable {
    id: string;
    viewerHasStarred: boolean;
}

export interface StarMutation {
    starrable: Starrable;
}

export interface AddStar {
    addStar: StarMutation;
}

export interface RemoveStar {
    removeStar: StarMutation;
}

export type AddOrRemoeStar = AddStar | RemoveStar;

export interface StarMutationData {
    data: AddOrRemoeStar;
}

export interface Viewer {
    login: string;
    name: string;
    url: string;
    bio?: string;
    company?: any;
    repositories?: RepoEdge;
}

export interface ViewerResponse {
    viewer?: Viewer;
}

export interface Repository {
    name: string;
    url: string;
}

export interface Organization {
    name: string;
    url: string;
    repository?: Repository;
}

export interface OrganizationVariables {
    organization: string; repository?: string;
}

export interface OrganizationResponse {
    organization: Organization;
}

export interface SelectedRepositoryIdsResponse {
    selectedRepositoryIds: Array<string>;
}

export interface ToggleSelectedRepositoryVariables {
    id: string;
    isSelected: boolean;
}

export interface ToggleSelectedRepositoryResponse extends ToggleSelectedRepositoryVariables {
    __typename: string;
}

/**
 * Describes a generic GraphQL response where the data property is "any"
 */
export interface GenericResponse {
    loading: boolean;
    data?: any;
    error?: Error;
}

/**
 * Defines objects in application cache
 */
export interface IApplicationCache {
    selectedRepositoryIds: Array<string>;
}