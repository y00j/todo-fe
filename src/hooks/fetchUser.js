export default async function fetchUser() {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            credentials: 'include',
            mode: "cors", // no-cors, *cors, same-origin                
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        console.log(json)
        return json;
    } catch(e) {
        console.error('There was a problem with the fetch operation:', e);
    }
}