export const decodeToken = (token: string) => {
    try {
        const payloadPart = token.split('.')[1];
        const decodedPayload = atob(payloadPart);
        return JSON.parse(decodedPayload);
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}

export const isTokenExpired = (token: string) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const decodedToken = decodeToken(token)
    return decodedToken && decodedToken.exp && decodedToken.exp < currentTime
}