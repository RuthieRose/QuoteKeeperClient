import { useEffect, useState } from 'react'
import { faTrash, faEnvelopeSquare, faImage, faSquareCaretRight, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import axiosAPI from 'axios'
import { useContextAccessToken, useContextUserId, useContextName, useContextUpdateDisplayQuote, useContextUpdateDisplayAuthor, useContextSaved } from '../Context'
import './saved.css'


export default function SavedQuotes({ setDisplay }) {

  let [array, setArray] = useState([])
  let [pageArray, setPageArray] = useState([])
  let [deleted, setDeleted] = useState(0)
  let [page, setPage] = useState(1)

  const token = useContextAccessToken()
  const userId = useContextUserId()
  const name = useContextName()
  const updateDisplayQuote = useContextUpdateDisplayQuote()
  const updateDisplayAuthor = useContextUpdateDisplayAuthor()
  const saved = useContextSaved()

  const navigate = useNavigate()


  const axios = axiosAPI.create({

    baseURL: 'https://quotekeeper.herokuapp.com',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  })


  useEffect(() => {
    handleQuotes()
  }, [deleted, saved])


  const handleQuotes = async () => {

    try {
      let response = await axios.get(`quotes/${userId}`)
      response = response.data
      response = response.map(set => {
        return [set['quote'], set['author'], set['_id']]
      })
      setArray(prev => [...response])
    }

    catch (err) {
      console.log(err)
      if (err.response.status == 403) {
        navigate('/')
        window.location.reload()
      }
    }
  }

  const deleteQuote = async (e) => {
    console.log('going to delete this quote', e.currentTarget.id)
    let id = e.currentTarget.id
    try {
      let response = await axios.delete(`quotes/${userId}/${id}`)
      setDeleted(prev => prev + 1)
    }

    catch (err) {
      console.log(err)
    }
  }

  const displayQuote = (e) => {
    let id = e.currentTarget.id
    let index;
    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }
    updateDisplayQuote(array[index][0])
    updateDisplayAuthor(array[index][1])
    navigate('/display')
  }

  const tweetQuote = (e) => {
    let id = e.currentTarget.id
    let index;

    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }

    let quote = array[index][0]
    let author = array[index][1]

    window.open(`http://twitter.com/intent/tweet?text=${quote} ~ ${author}%0A https://quotekeeper.io`, '_blank')
  }

  const mailQuote = (e) => {
    let id = e.currentTarget.id
    let index;
    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }

    let quote = array[index][0]
    let author = array[index][1]


    window.location.href = `mailto:?subject=I wanted to share a quote with you! &body=${quote} ~ ${author}`

  }

  const handlePagesNext = () => {

    let endSlice = page * 3 > array.length ? array.length : page * 3;
    let begSlice = page === 1 ? 0 : page * 3 - 3;
    let temp = [...array.slice(begSlice, endSlice)]
    setPageArray(prev => [])
    setPageArray(prev => [...temp])
    console.log(begSlice, endSlice)
  }


  const handleNext = () => {
    //let pageMax = Math.min(page + 1, array.length / 5)
    setPage(prev => prev + 1)
    if (page >= array.length / 3) setPage(prev => Math.ceil(array.length / 3))
  }

  const handlePrev = () => {
    setPage(prev => prev - 1)
    if (page < 2) setPage(prev => 1)
  }



  useEffect(() => {
    handlePagesNext()
  }, [page, array])

  const handleHome = () => {
    setDisplay(true)
  }

  useEffect(() => {
    setDisplay(false)
  }, [])

  let quoteList = pageArray.map((array, index) => {

    let quote = array[0]
    let author = array[1]
    let id = array[2]
    return (
      <div key={id}>
        <div>
          <FontAwesomeIcon className="saved-action-buttons" icon={faImage} onClick={displayQuote} id={id} />
          <FontAwesomeIcon className="saved-action-buttons" icon={faTwitter} onClick={tweetQuote} id={id} />
          <FontAwesomeIcon className="saved-action-buttons" icon={faEnvelopeSquare} onClick={mailQuote} id={id} />
          <FontAwesomeIcon className="saved-action-buttons" icon={faTrash} onClick={deleteQuote} id={id} />

        </div>
        <h3 className='saved-quote'>{quote}</h3>
        <p className='saved-author'>{author}</p>
      </div>
    )
  })

  return (
    <div className="saved-quotes-container">
      <h2 className="saved-quotes">{name}'s Quotes</h2>
      <main className="quote-list">{quoteList}</main>
      <div className="page-buttons">
        <FontAwesomeIcon className="page-button" icon={faSquareCaretLeft} onClick={handlePrev} />
        <FontAwesomeIcon className="page-button" icon={faSquareCaretRight} onClick={handleNext} />
      </div>
      <div className="back-to-quotes" onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
    </div>
  )
}