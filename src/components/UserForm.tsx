import React, { useState, InputHTMLAttributes } from 'react'
import { User } from '../api/reqres'

type UserFormFieldProps = {
  fieldName: string,
  user: User | any,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  disabled: boolean,
}
const UserFormField = ({fieldName, user, onChange, disabled}: UserFormFieldProps) => (
  <p>
    <label htmlFor={fieldName}>{fieldName.replace('/_/g', ' ')}</label>
    <input
      id={fieldName}
      value={user[fieldName]}
      placeholder={fieldName}
      onChange={onChange}
      disabled={disabled}
    />
  </p>
)

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
      <UserFormField fieldName='first_name' user={user} onChange={updateUserInfo('first_name')} disabled={loading} />
      <UserFormField fieldName='last_name' user={user} onChange={updateUserInfo('last_name')} disabled={loading} />
      <UserFormField fieldName='email' user={user} onChange={updateUserInfo('email')} disabled={loading} />
      <UserFormField fieldName='avatar' user={user} onChange={updateUserInfo('avatar')} disabled={loading} />
      <button onClick={submitEvt} disabled={loading}>
        Submit
      </button>
    </form>
  )
}

export default UserForm