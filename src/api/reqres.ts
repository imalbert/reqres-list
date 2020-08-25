const REQRES_API = 'https://reqres.in/api'

global.localStorage.setItem('REQRES_LOCAL', JSON.stringify({}))

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
    const oldData = localStorage.getItem('REQRES_LOCAL')
    if (oldData && JSON.parse(oldData)?.data?.length > 0) {
      return JSON.parse(oldData).data
    }

    return fetch(`${REQRES_API}/users?page=${page}`)
      .then(res => res.json())
      .then(({ data }) => {
        localStorage.setItem('REQRES_LOCAL', JSON.stringify({ data }))
        return data
      })
  },
  create: (user: User) => {
    return fetch(`${REQRES_API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(user => {
        const { data } = JSON.parse(localStorage.getItem('REQRES_LOCAL') || '{ data: [] }')
        localStorage.setItem('REQRES_LOCAL', JSON.stringify({ data: [user, ...data] }))
        return user
      })
  },
  update: (user: User, id: number) => {
    return fetch(`${REQRES_API}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(user => {
        const { data } = JSON.parse(localStorage.getItem('REQRES_LOCAL') || '{ data: [] }')
        const userIndex = data.findIndex((u: User) => u.id === user.id)
        const updatedData = [
          ...data.slice(0, userIndex),
          user,
          ...data.slice(userIndex + 1),
        ]
        localStorage.setItem('REQRES_LOCAL', JSON.stringify({ data: updatedData }))

        return user
      })
  },
  delete: (id: string) => {
    return fetch(`${REQRES_API}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        const { data } = JSON.parse(localStorage.getItem('REQRES_LOCAL') || '{ data: [] }')
        const userIndex = data.findIndex((u: User) => u.id === id)
        const updatedData = [
          ...data.slice(0, userIndex),
          ...data.slice(userIndex + 1),
        ]
        localStorage.setItem('REQRES_LOCAL', JSON.stringify({ data: updatedData }))

        return true
      })
  }
}