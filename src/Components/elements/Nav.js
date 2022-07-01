import { Link } from 'react-router-dom'
import './nav.css'

export default function Nav() {
 return (
  <nav>
   <Link to="/">Home</Link>
   <Link to="/login">Login</Link>
   <Link to="/saved">Saved Quotes</Link>
   <Link to="/add">Add a Quote</Link>
  </nav>
 )
}