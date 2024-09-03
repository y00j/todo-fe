export default async function fetchTodos() {
    try {
        console.log(import.meta.env.VITE_API_URL)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
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
        console.log(response, json)
        return json;
    } catch(e) {
        throw new Error('There was a problem with the fetch operation:', error);
    }
}