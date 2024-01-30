import useFetch from './useFetch'

export default function useLogin(email, password) {
    return useFetch('/api/login', 'POST', { email, password })
}