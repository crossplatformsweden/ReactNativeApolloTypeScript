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

export type RepoEdge = {
    edges: Array<RepoNode>;
};

export type Language = {
    name: string;
};

export type Owner = {
    login: string;
    url: string;
};

export type UserCount = {
    totalCount: number
};

export type RepoNodeItem = {
    id: string;
    name: string;
    url: string;
    descriptionHTML: string;
    primaryLanguage: Language;
    owner: Owner;
    stargazers: UserCount;
    viewerHasStarred: boolean;
    watchers: UserCount;
    viewerSubscription: string
};

export type RepoNode = {
    node: RepoNodeItem;
};

export type Starrable = {
    id: string;
    viewerHasStarred: boolean;
};

export type StarMutation = {
    starrable: Starrable;
};

export type AddStar = {
    addStar: StarMutation;
};

export type RemoveStar = {
    removeStar: StarMutation;
};

export type AddOrRemoeStar = AddStar | RemoveStar;

export type StarMutationData = {
    data: AddOrRemoeStar;
};

export type Viewer = {
    login: string;
    name: string;
    url: string;
    bio?: string;
    company?: any;
    repositories?: RepoEdge
};

export type ViewerResponse = {
    viewer?: Viewer;
};

export type Repository = {
    name: string,
    url: string
};

export type Organization = {
    name: string,
    url: string,
    repository?: Repository
};

export type OrganizationVariables = {
    organization: string, repository?: string
};

export type OrganizationResponse = {
    organization: Organization
};

export type SelectedRepositoryIdsResponse = {
    selectedRepositoryIds: Array<string>;
};

export type ToggleSelectedRepositoryVariables = {
    id: string;
    isSelected: boolean;
    __typename: string;
};

/**
 * Describes a generic GraphQL response where the data property is "any"
 */
export type GenericResponse = {
    loading: boolean;
    data?: any;
    error?: Error;
};

/**
 * Defines objects in application cache
 */
export interface IApplicationCache {
    selectedRepositoryIds: Array<string>;
}