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

      {loggedIn ? <Link id="link1" to="/saved">Saved Quotes</Link> : null}
      {loggedIn ? <Link id="link2" to="/add">Add a Quote</Link> : null}
      {loggedIn ? <Link id="link3" to="/random">Feature Quote</Link> : null}
      {loggedIn ? <Link id="link4"  to="/account"><FontAwesomeIcon icon={faUser} /></Link> : null}
      {loggedIn ? <FontAwesomeIcon id="link5" className="logout" icon={faRightFromBracket} onClick={logout} /> : null}
    </nav>
  )
}