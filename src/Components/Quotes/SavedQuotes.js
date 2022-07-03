import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './saved.css'

export default function SavedQuotes({setDisplay}) {

 useEffect(() => {
  setDisplay(false)
 },[])

 const handleHome = () => {
  setDisplay(true)
}

 return (
  <>
  <div>This is the saved quotes page</div>
  <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
  </>
 )
}