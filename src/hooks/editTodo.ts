export default async function editTodo(id, title) {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
            credentials: 'include',
            mode: "cors", // no-cors, *cors, same-origin
            method: 'PATCH',
            body: JSON.stringify({title}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.log("failed to edit todo");
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json()
        return json;
    } catch (e) {
        alert(e);
    }
}