const login = async ({ email, password }) => {
    try {  
        console.log(import.meta.env)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            credentials: 'include',
            mode: "cors", // no-cors, *cors, same-origin
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.log("failed login");
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (e) {
        console.error('Login error:', e);
    }
};

export default login;