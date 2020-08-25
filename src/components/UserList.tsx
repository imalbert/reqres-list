import React, { useState, ReactEventHandler } from 'react'
import { User } from '../api/reqres'

type UserFormProps = {
  user: User | any,
  updateUser: Function,
  onSubmit: Function
}
const UserForm = ({ user, updateUser, onSubmit }: UserFormProps) => {
  const updateUserInfo = (info: string) => {
    return ({ target }: { target: { value: string }}) => {
      updateUser({ ...user, [info]: target.value })
    }
  }
  const submitEvt = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    onSubmit(user, user.id)
  }

  return (
    <form onSubmit={submitEvt}>
      <input
        value={user?.first_name}
        placeholder='First name'
        onChange={updateUserInfo('first_name')}
      />
      <input
        value={user?.last_name}
        placeholder='Last name'
        onChange={updateUserInfo('last_name')}
      />
      <input
        value={user?.email}
        placeholder='Email'
        onChange={updateUserInfo('email')}
      />
      <input
        value={user?.avatar}
        placeholder='Avatar'
        onChange={updateUserInfo('avatar')}
      />
      <button onClick={submitEvt}>Submit</button>
    </form>
  )
}

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

type UserListProps = {
  users: Array<User>,
  onUpdateUser: Function,
  updating: null | string,
  onToggleUpdate: Function,
}
const UserList = (props: UserListProps) => {
  const [updatingUser, setUpdatingUser] = useState<User|null>(null)
  console.log(updatingUser, props.updating)

  return (
    <ul>
      {props.users.map((user) => (
        <li>
          {props.updating === user.id
            ? <UserForm user={updatingUser} updateUser={setUpdatingUser} onSubmit={props.onUpdateUser} />
            : <UserItem user={user} onToggleUpdate={props.onToggleUpdate} setUpdatingUser={setUpdatingUser} />
          }
        </li>
      ))}
    </ul>
  )
}

export default UserList