export type AuthState = {
    user: {
        firstName?: string,
        lastName?: string,
        username: string,
        password: string,
        accessToken?: string,
        pathname?: string
    };
    auth: {
        isLoggedIn: boolean;
        loading?: boolean;
        error?: any,
    }
}