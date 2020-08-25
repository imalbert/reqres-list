import React from 'react'
import { User } from '../api/reqres'

type UserItemProps = { user: User, onToggleUpdate: Function, setUpdatingUser: Function }
const UserItem = ({ user, onToggleUpdate, setUpdatingUser }: UserItemProps) => {
  const { first_name, last_name, email, avatar, id } = user
  return (
    <dl>
      <img src={avatar} alt={`${first_name} ${last_name}`} />
      <dt>Name</dt>
      <dd>{`${first_name} ${last_name}`}</dd>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dd>
        <button onClick={() => {
          onToggleUpdate(id)
          setUpdatingUser({ ...user })
        }}>
          update
        </button>
        <button>Delete</button>
      </dd>
    </dl>
  )
}

export default UserItem