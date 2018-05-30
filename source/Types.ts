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

export type Viewer = {
    login: string;
    name: string;
    url: string;
    bio?: string;
    company?: any;
    repositories?: RepoEdge
};

export type Response = {
    viewer?: Viewer
};