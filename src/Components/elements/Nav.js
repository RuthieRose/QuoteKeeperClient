import { Link, useNavigate } from 'react-router-dom'
import { useContextLoggedIn } from '../Context'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './nav.css'

export default function Nav({ setDisplay }) {

  const navigate = useNavigate()

  const loggedIn = useContextLoggedIn()

  const logout = () => {

    setDisplay(true)
    navigate('/')
    window.location.reload()
  }

  return (
    <nav>

      {loggedIn ? <Link to="/saved">Saved Quotes</Link> : null}
      {loggedIn ? <Link to="/add">Add a Quote</Link> : null}
      {loggedIn ? <Link to="/random">Feature Quote</Link> : null}
      {loggedIn ? <Link to="/account"><FontAwesomeIcon icon={faUser} /></Link> : null}
      {loggedIn ? <FontAwesomeIcon className="logout" icon={faRightFromBracket} onClick={logout} /> : null}
    </nav>
  )
}