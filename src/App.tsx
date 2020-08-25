import React from 'react';
import './App.css';

import reqresAPI, { User } from './api/reqres'

import UserList from './components/UserList'
import UserCreate from './components/UserCreate'

class App extends React.Component {
  state = {
    users: [],
    updating: null,
    creating: false,
  }

  async componentDidMount() {
    let users = await reqresAPI.list()
    this.setState({ users })
  }

  render () {
    console.log(this.state.users)
    const { users, updating } = this.state
    return (
      <div>
        <button onClick={this.handleToggleCreate}>
          {this.state.creating ? 'Cancel' : 'New user'}
        </button>
        {this.state.creating
          ? <UserCreate onCreateUser={this.handleCreateUser} />
          : (
            <UserList
              users={users}
              onUpdateUser={this.handleUpdateUser}
              updating={updating}
              onToggleUpdate={this.handleToggleUpdate}
              onDeleteUser={this.handleDeleteUser}
            />
          )
        }
      </div>
    );
  }

  handleToggleCreate = () => { this.setState({ creating: !this.state.creating }) }
  handleCreateUser = async (user: User) => {
    await reqresAPI.create(user)
    this.setState({ creating: false })
    this.setState({ users: await reqresAPI.list() })
  }

  handleToggleUpdate = (id: string) => { this.setState({ updating: id }) }
  handleUpdateUser = async (user: User, id: number) => {
    await reqresAPI.update(user, id)
    this.setState({ updating: null })
    this.setState({ users: await reqresAPI.list() })
  }

  handleDeleteUser = async (id: string) => {
    await reqresAPI.delete(id)
  }
}

export default App;
