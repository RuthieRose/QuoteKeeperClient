
import { useContextDisplayQuote, useContextDisplayAuthor,  useContextUpdateDisplayQuote, useContextUpdateDisplayAuthor } from '../Context'
import { Link, useNavigate } from 'react-router-dom'

function DisplayQuote({ setDisplay }) {

  setDisplay(false)

  const handleHome = () => {
    setDisplay(true)
  }

  const navigate = useNavigate()
  const updateQuote = useContextUpdateDisplayQuote()
  const updateAuthor = useContextUpdateDisplayAuthor()

  let contextQuote = useContextDisplayQuote()
  let contextAuthor = useContextDisplayAuthor()


  return (
    <>
      <main>
        {contextQuote && <div>{contextQuote} ~ {contextAuthor}</div>}
      </main>

      <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
    </>
  )
}

export default DisplayQuote