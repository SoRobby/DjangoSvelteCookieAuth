import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;


export async function getUser(accessToken: string) {
    const endpoint = `${API_BASE_URL}/auth/get-current-user`;
    try {
        const resp = await fetch(
            endpoint,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        if (resp.status === 200) {
            const jsonData = await resp.json();
            return jsonData;
        }
    } catch (err) {
        console.log(err)
    }
}