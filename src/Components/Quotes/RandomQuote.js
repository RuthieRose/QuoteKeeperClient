
import { useContextUserId, useContextAccessToken } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './display.css'
import axiosAPI from 'axios'


function Random({ setDisplay }) {

  let [backdrop, setBackdrop] = useState('none')

  useEffect(() => {
    setDisplay(false)
  }, [])

  const handleHome = () => {
    setDisplay(true)
  }

  const userId = useContextUserId()
  const token = useContextAccessToken()
  const navigate = useNavigate()

  let [quote, setQuote] = useState(null)
  let [author, setAuthor] = useState(null)

  const axios = axiosAPI.create({

    baseURL: 'https://quotekeeper.herokuapp.com',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  })

  const getRandom = async () => {
    try {

      let response = await axios.get(`quotes/${userId}/random`)
      response = response.data
      setQuote(response.quote)
      setAuthor(response.author)
      console.log(response)
    }

    catch (err) {
      console.log(err)
      if (err.response.status == 403) {
        navigate('/')
        window.location.reload()
      }
    }
  }


  useEffect(() => {
    getRandom()
  }, [])

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
      <main className='quote-container-display'>
        {quote &&
          <div className={`quote-display-frame ${backdrop}Display`}>
            <div className="quote-display">{quote}</div>
            <div className="author-display">{author}</div>
          </div>
        }
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
      <div className='back-parent'  onClick={handleHome}><Link  className="back-to-quotes" to='/'>Back to Quotes</Link></div>
    </>
  )
}

export default Random