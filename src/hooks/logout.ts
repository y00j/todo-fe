const logout = async () => {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            credentials: 'include',
            mode: "cors", // no-cors, *cors, same-origin
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.log("failed logout");
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json()
        console.log(json);
        return json;
    } catch (e) {
        alert(e);
    }
}

export default logout;