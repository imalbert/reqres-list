import React from 'react'
import { User } from '../api/reqres'

type UserItemProps = { user: User, onToggleUpdate: Function, setUpdatingUser: Function }
const UserItem = ({ user, onToggleUpdate, setUpdatingUser }: UserItemProps) => {
  return (
    <>
      {user.id} - {user.email} - {user.first_name} - {user.last_name} - {user.avatar}
      <button onClick={() => {
        onToggleUpdate(user.id)
        setUpdatingUser({ ...user })
      }}>
        update
      </button>
      <button>Delete</button>
    </>
  )
}

export default UserItem