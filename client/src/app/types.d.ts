export type AuthState = {
    user: {
        firstName?: string,
        lastName?: string,
        username: string,
        password?: string,
        confirmPassword?: string;
    };
    auth: {
        isLoggedIn: boolean;
        loading?: boolean;
        error?: string | null
        code: string | null
        authType?: string;
    },
    socialMedia: {
        id: string | null,
        displayName: string | null,
        photo: string | null
    },
    routeInfo: {
        pathname?: string | undefined;
    }
}

export type Joke = {
    jokeArray: string[];
    index: number
}

export type UserAndRoutes = AuthState['user'] & AuthState['routeInfo']

export type ValidateUer = {
    message: string,
    validate: boolean;
}

export type ToastProviderProps = {
    children: React.ReactNode
}