
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId} from './Components/Context'
import QuoteOfTheDay from './Components/Quotes/QuoteOfTheDay'
import Login from './Components/login/Login'
import Register from './Components/login/Register'
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

  function PrintLoggedIn() {
    console.log(loggedIn, accessToken, userId)
  }

  function RequireAuth() {
    const location = useLocation();

    return loggedIn ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
  }

  return (


    <div className="App">
      <Nav />
      <header className="App-header">
        <h1>
          Quote Keeper
        </h1>
      </header>
    

      <Routes>

        <Route path="/" element={<QuoteOfTheDay />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route path="passwordreset/request" element={<Request />} />


        <Route path='/' element={<RequireAuth />}>
          <Route path="saved" element={<SavedQuotes />} />
          <Route path="add" element={<AddQuote />} />
        </Route>
      </Routes>

      <Footer />
    </div>

  );
}

export default App;
