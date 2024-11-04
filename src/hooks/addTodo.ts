export default async function addTodo(title) {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
            credentials: 'include',
            mode: "cors", // no-cors, *cors, same-origin
            body: JSON.stringify({title}),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        // if (!response.ok) {
            //     console.log("failed to add todo");
            //     throw new Error(`${response.status} ${response.statusText}`);
            // }
            
        const json = await response.json()
        console.log({response, json})
        return json;
    } catch (e) {
        alert(e);
    }
}