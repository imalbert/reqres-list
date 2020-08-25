import React, { useState } from 'react'
import { User } from '../api/reqres'

type UserFormProps = {
  user: User | any,
  updateUser: Function,
  onSubmit: Function
}
const UserForm = ({ user, updateUser, onSubmit }: UserFormProps) => {
  const [loading, setLoading] = useState(false)
  const updateUserInfo = (info: string) => {
    return ({ target }: { target: { value: string }}) => {
      updateUser({ ...user, [info]: target.value })
    }
  }
  const submitEvt = (evt: React.SyntheticEvent) => {
    setLoading(true)
    evt.preventDefault()
    onSubmit(user, user.id)
  }

  return (
    <form onSubmit={submitEvt}>
      <input
        value={user?.first_name}
        placeholder='First name'
        onChange={updateUserInfo('first_name')}
        disabled={loading}
      />
      <input
        value={user?.last_name}
        placeholder='Last name'
        onChange={updateUserInfo('last_name')}
        disabled={loading}
      />
      <input
        value={user?.email}
        placeholder='Email'
        onChange={updateUserInfo('email')}
        disabled={loading}
      />
      <input
        value={user?.avatar}
        placeholder='Avatar'
        onChange={updateUserInfo('avatar')}
        disabled={loading}
      />
      <button
        onClick={submitEvt}
        disabled={loading}
      >
        Submit
      </button>
    </form>
  )
}

export default UserForm