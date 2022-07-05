
import {useContextUserId, useContextAccessToken} from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axiosAPI from 'axios'


function Random({ setDisplay }) {
  

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


  useEffect( () => {
    getRandom()
  }, [])


  return (
    <>
      <main id={'screenshot'}>
        {quote && <div>{quote} ~ {author}</div>}
      </main>

      <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
    </>
  )
}

export default Random