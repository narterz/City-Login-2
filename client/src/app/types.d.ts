export type AuthState = {
    user: {
        firstName?: string,
        lastName?: string,
        username: string,
        password: string,
    };
    auth: {
        isLoggedIn: boolean;
        loading?: boolean;
        error?: any,
        accessToken?: string,
    },
    socialMedia: {
        id: string,
        displayName: string,
        photo: string
    },
    routeInfo: {
        pathname?: string | undefined;
        isLoggingIn?: boolean
    }
}

export type UserAndRoutes = AuthState['user'] & AuthState['routeInfo']

export type ValidateUer = {
    message: string,
    validate: boolean;
}

export type ToastProviderProps = {
    children: React.ReactNode
}