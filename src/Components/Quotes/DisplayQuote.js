import { useEffect, useState } from 'react'
import { useContextDisplayQuote, useContextDisplayAuthor, useContextUpdateDisplayQuote, useContextUpdateDisplayAuthor } from '../Context'
import './display.css'
import { Link, useNavigate } from 'react-router-dom'

function DisplayQuote({ setDisplay }) {

  let [backdrop, setBackdrop] = useState(null)

  useEffect(() => {
    setDisplay(false)
  }, [])

  const handleHome = () => {
    setDisplay(true)
  }

  const navigate = useNavigate()
  const updateQuote = useContextUpdateDisplayQuote()
  const updateAuthor = useContextUpdateDisplayAuthor()

  let contextQuote = useContextDisplayQuote()
  let contextAuthor = useContextDisplayAuthor()

  const addFerns = () => { 
    setBackdrop('ferns')
  }

  const addFire = () => { 
    setBackdrop('fire')
  }

  const addPurple = () => { 
    setBackdrop('purple')
  }

  const addMountain = () => { 
    setBackdrop('mountain')
  }

  const addStars = () => { 
    setBackdrop('stars')
  }

  const addOcean = () => { 
    setBackdrop('ocean')
  }

  const addNone = () => {
    setBackdrop('none')
  }



  return (
    <>
      <main className="quote-container-display">
        {contextQuote &&
          <div className={`quote-display-frame ${backdrop}Display`}>
            <div className="quote-display">
              {contextQuote}
            </div>

            <div className="author-display">
              {contextAuthor}
            </div>
          </div>}
      </main>
      <div className="options-parent">
        <div className="options">

          <div onClick={addFerns} className="ferns"></div>
          <div onClick={addFire} className="fire"></div>
          <div onClick={addPurple} className="purple"></div>
          <div onClick={addMountain} className="purple-mountain"></div>
          <div onClick={addStars} className="stars"></div>
          <div onClick={addOcean} className="ocean"></div>
          <div onClick={addNone} className="none"></div>
    

        </div>

      </div>

      <div className='back-parent' onClick={handleHome}><Link  className="back-to-quotes" to='/'>Back to Quotes</Link></div>
    </>
  )
}

export default DisplayQuote