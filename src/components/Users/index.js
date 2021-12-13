import {Component} from 'react'
import {v4} from 'uuid'

import UsersList from '../UsersList'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Users extends Component {
  state = {
    appointmentsList: [],
    searchInput: '',
    titleInput: '',
    websiteInput: '',
    passwordInput: '',
    isFiltered: true,
  }

  deleteComment = id => {
    const {appointmentsList} = this.state

    this.setState({
      appointmentsList: appointmentsList.filter(comment => comment.id !== id),
    })
  }

  onFilter = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, websiteInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newAppointment = {
      id: v4(),
      title: titleInput,
      website: websiteInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      websiteInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      titleInput,
      websiteInput,
      passwordInput,
      searchInput,
      appointmentsList,
      isFiltered,
    } = this.state
    const filteredUsersList = appointmentsList.filter(eachItem =>
      eachItem.password.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add New Password</h1>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    type="text"
                    id="title"
                    value={websiteInput}
                    onChange={this.onChangeWebsiteInput}
                    className="input"
                    placeholder="Enter Website"
                  />
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    type="text"
                    id="user"
                    value={titleInput}
                    onChange={this.onChangeTitleInput}
                    className="input"
                    placeholder="Enter Username"
                  />
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    type="password"
                    id="pass"
                    value={passwordInput}
                    onChange={this.onChangePasswordInput}
                    className="input"
                    placeholder="Enter Password"
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="comments-count">
                {filteredUsersList.length > 0 ? filteredUsersList.length : 0}
              </p>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  value={searchInput}
                  onChange={this.onSearchInput}
                  placeholder="Search"
                />
              </div>
              <input
                id="showPassword"
                type="checkbox"
                onClick={this.onFilter}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>
            <ul className="appointments-list">
              {filteredUsersList.length > 0 ? (
                filteredUsersList.map(eachAppointment => (
                  <UsersList
                    key={eachAppointment.id}
                    appointmentDetails={eachAppointment}
                    toggleIsStarred={this.deleteComment}
                    isFiltered={isFiltered}
                  />
                ))
              ) : (
                <div>
                  <p>No Passwords</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Users
