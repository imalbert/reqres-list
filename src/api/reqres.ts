const REQRES_API = 'https://reqres.in/api'

export default {
  list: (page: number = 1) => {
    return fetch(`${REQRES_API}/users?page${page}`)
      .then(res => res.json())
      .then(({ data }) => console.log(data))
  }
}