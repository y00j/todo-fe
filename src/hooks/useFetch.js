import * as React from 'react'

const API = 'localhost:3000'

export default function useFetch (path, method, body={}) {
  const [response, setResponse] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    setResponse(null)

    const abortController = new AbortController()
    const signal = abortController.signal

    fetch(`${API}${path}`, {
      credentials: 'same-origin',
      method,
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then(({ body }) => body ? JSON.parse(body) : null)
    .then((data) => {
      if (!signal.aborted) {
        setResponse(data)
        setLoading(false)
      }
    })
    .catch((error) => console.warn('Uh-oh.', error))

    return () => abortController.abort()
  }, [path, method, body])

  return { response, loading }
}
