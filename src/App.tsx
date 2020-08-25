import React from 'react';
import './App.css';

import reqresAPI, { User } from './api/reqres'

import UserList from './components/UserList'

class App extends React.Component {
  state = {
    users: [],
    updating: null,
  }

  async componentDidMount() {
    let users = await reqresAPI.list()
    this.setState({ users })
    let newUser = await reqresAPI.create({ name: 'Albert', job: 'unemployed' })
    let updatedUser = await reqresAPI.get(newUser.id)
    await reqresAPI.list(2)
    await reqresAPI.delete(newUser.id)
  }

  render () {
    console.log(this.state.users)
    const { users, updating } = this.state
    return (
      <div>
        <UserList
          users={users}
          onUpdateUser={this.handleUpdateUser}
          updating={updating}
          onToggleUpdate={this.handleToggleUpdate}
        />
      </div>
    );
  }

  handleUpdateUser = async (user: User, id: number) => {
    await reqresAPI.update(user, id)
    this.setState({ updating: null })
    this.setState({ users: await reqresAPI.list() })
  }

  handleToggleUpdate = (id: string) => {
    this.setState({ updating: id })
  }

  handleDeleteUser() {

  }
}

export default App;
