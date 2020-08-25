const REQRES_API = 'https://reqres.in/api'

export type User = {
  name?: string,
  job?: string,
  email?: string,
  first_name?: string,
  last_name?: string,
  avatar?: string,
  id?: string,
  createdAt?: string,
  updatedAt?: string,
}

export default {
  list: (page: number = 1) => {
    return fetch(`${REQRES_API}/users?page=${page}`)
      .then(res => res.json())
      .then(({ data }) => data)
  },
  get: (id: string) => {
    return fetch(`${REQRES_API}/users/${id}`)
      .then(res => res.json())
      .then(user => user)
  },
  create: (user: User) => {
    return fetch(`${REQRES_API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(user => user)

  },
  update: (user: User, id: number) => {
    return fetch(`${REQRES_API}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(user => user)
  },
  delete: (id: string) => {
    return fetch(`${REQRES_API}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(res => res)
  }
}