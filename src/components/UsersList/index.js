import './index.css'

const UsersList = props => {
  const {appointmentDetails, toggleIsStarred, isFiltered} = props
  const {id, title, website, password, initialClassName} = appointmentDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onDeleteComment = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <p className="title">{website}</p>
        <p className="title">{title}</p>
        {isFiltered ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        ) : (
          <p>{password}</p>
        )}
        <button
          className="button"
          type="button"
          testid="delete"
          onClick={onDeleteComment}
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default UsersList
