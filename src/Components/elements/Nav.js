import { Link } from 'react-router-dom'
import { useContextLoggedIn } from '../Context'
import './nav.css'

export default function Nav() {

 const loggedIn = useContextLoggedIn()

 return (
  <nav>

   { loggedIn ? <Link to="/saved">Saved Quotes</Link> : null }
   { loggedIn ? <Link to="/add">Add a Quote</Link> : null }
   { loggedIn ? <Link to="/display">Feature Quote</Link> : null }
  </nav>
 )
}