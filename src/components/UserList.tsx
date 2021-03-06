import React, { useState } from 'react'
import { User } from '../api/reqres'
import UserForm from './UserForm'
import UserItem from './UserItem'

type UserListProps = {
  users: Array<User>,
  onUpdateUser: Function,
  updating: null | string,
  onToggleUpdate: Function,
  onDeleteUser: Function,
}
const UserList = (props: UserListProps) => {
  const [updatingUser, setUpdatingUser] = useState<User|null>(null)

  return (
    <ul>
      {props.users.map((user) => (
        <li>
          {props.updating === user.id
            ? (
              <UserForm
                user={updatingUser}
                updateUser={setUpdatingUser}
                onSubmit={props.onUpdateUser}
              />
            )
            : (
              <UserItem
                user={user}
                onToggleUpdate={props.onToggleUpdate}
                setUpdatingUser={setUpdatingUser}
                onDeleteUser={props.onDeleteUser}
              />
            )
          }
        </li>
      ))}
    </ul>
  )
}

export default UserList