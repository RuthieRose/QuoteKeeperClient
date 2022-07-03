
import {useEffect, useState} from 'react'
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId} from './Components/Context'
import QuoteOfTheDay from './Components/Quotes/QuoteOfTheDay'
import Parent from './Components/login/Parent'
import SavedQuotes from './Components/Quotes/SavedQuotes'
import AddQuote from './Components/Quotes/AddQuote'
import Reset from './Components/reset/Reset'
import Request from './Components/reset/Request'
import Nav from './Components/elements/Nav'
import Footer from './Components/elements/Footer'
import { Navigate, Outlet, Routes, Route, useLocation } from 'react-router-dom'

function App() {

  const loggedIn = useContextLoggedIn()
  const updateLoggedIn = useContextUpdateLoggedIn()
  const updateLoggedOut = useContextUpdateLoggedOut()
  const userId = useContextUserId()
  const updateUserId = useContextUpdateUserId()
  const accessToken = useContextAccessToken()
  const updateAccessToken = useContextUpdateAccessToken()

  function RequireAuth() {
    const location = useLocation();

    return loggedIn ? <Outlet /> : null
  }

  let [display, setDisplay] = useState(true)


  return (


    <div className="App">
      <Nav />
      <header className="App-header">
        <h1>
          Quote Keeper
        </h1>
      </header>
     
     <main>
     {display ? <QuoteOfTheDay /> : null }
     </main>
     
     <section>
     {loggedIn ? null : <Parent />}
     </section>

      <Routes>

        <Route path="passwordreset/reset" element={<Reset />} />
        <Route path="passwordreset/request" element={<Request />} />


        <Route path='/' element={<RequireAuth />}>
          <Route path="saved" element={<SavedQuotes setDisplay={setDisplay} />} />
          <Route path="add" element={<AddQuote setDisplay={setDisplay} />} />
        </Route>
      </Routes>

      <Footer />
    </div>

  );
}

export default App;
