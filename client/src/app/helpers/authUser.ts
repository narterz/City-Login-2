export const handleRouteName = (social: string) => {
    let path: string | undefined;
    console.log(social)
    switch (social) {
        case "login":
            path = `/api/login`
            break;
        case "signUp":
            path = `/api/signUp`
            break
        case "facebook":
            path = `/auth/facebook`
            break;
        case "discord":
            path = `/auth/discord`
            break;
        case "github":
            path = `/auth/github`
            break;
        case "google":
            path = `/auth/google`
            break
        default:
            break;
    }
    return path
}