import { useEffect, useState } from 'react'
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId } from './Components/Context'
import QuoteOfTheDay from './Components/Quotes/QuoteOfTheDay'
import Parent from './Components/login/Parent'
import SavedQuotes from './Components/Quotes/SavedQuotes'
import AddQuote from './Components/Quotes/AddQuote'
import Reset from './Components/account/Reset'
import Request from './Components/account/Request'
import DisplayQuote from './Components/Quotes/DisplayQuote'
import Random from './Components/Quotes/RandomQuote'
import Account from './Components/account/AccountManagement'
import Nav from './Components/elements/Nav'
import Footer from './Components/elements/Footer'
import "@fontsource/nunito"
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
  let [displayReset, setDisplayReset] = useState(false)


  return (


    <div className="App">

      <section>
        {(loggedIn || displayReset) ? null : <Parent />}
      </section>
      {loggedIn && <Nav setDisplay={setDisplay} />}

      <main>
        {display ? <QuoteOfTheDay /> : null}
      </main>



      <Routes>

        <Route path="passwordreset/reset" element={<Reset setDisplay={setDisplay} setDisplayReset={setDisplayReset} />} />
        <Route path="passwordreset/request" element={<Request  setDisplay={setDisplay} setDisplayReset={setDisplayReset} />} />


        <Route path='/' element={<RequireAuth />}>
          <Route path="saved" element={<SavedQuotes setDisplay={setDisplay} />} />
          <Route path="display" element={<DisplayQuote setDisplay={setDisplay} />} />
          <Route path="random" element={<Random setDisplay={setDisplay} />} />

          <Route path="add" element={<AddQuote setDisplay={setDisplay} />} />
          <Route path="account" element={<Account setDisplay={setDisplay} />} />
        </Route>
      </Routes>

      <Footer />
    </div>

  );
}

export default App;
