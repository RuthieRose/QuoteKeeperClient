import { useEffect} from 'react'
import { useContextDisplayQuoteSet } from '../Context'


function DisplayQuote({setDisplay}) {

  useEffect(() => {
    setDisplay(false)
   },[])
  
  let set = useContextDisplayQuoteSet()

  if (set === null) {
    set = ['random', 'random']
  }

  let quote = set[0] 
  let author = set[1]

  return (
    <div>{quote} ~ {author}</div>
  )
}

export default DisplayQuote