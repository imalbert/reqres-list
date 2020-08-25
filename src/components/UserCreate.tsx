import React, { useState } from 'react'
import UserForm from './UserForm'
import { User } from '../api/reqres'

type UserCreateProps = {
  onCreateUser: Function,
}
const UserCreate = ({ onCreateUser }: UserCreateProps) => {
  const [newUser, setNewUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  })
  return (
    <UserForm user={newUser} updateUser={setNewUser} onSubmit={onCreateUser} />
  )
}

export default UserCreate