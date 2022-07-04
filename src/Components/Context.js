import React, { useContext, useState } from 'react'

const LoggedInContext = React.createContext()
const UpdateLoggedInContext = React.createContext()
const UserIdContext = React.createContext()
const UpdateLoggedOutContext = React.createContext()
const UpdateUserIdContext = React.createContext()
const AccessToken = React.createContext()
const UpdateAccessToken = React.createContext()
const Name = React.createContext()
const UpdateName = React.createContext()
const CurrQuote = React.createContext()
const UpdateCurrQuote = React.createContext()
const CurrAuthor = React.createContext()
const UpdateCurrAuthor = React.createContext()
const Count = React.createContext()
const UpdateCount = React.createContext()
const DisplayQuote = React.createContext()
const UpdateDisplayQuote = React.createContext()
const DisplayAuthor = React.createContext()
const UpdateDisplayAuthor = React.createContext()

export function useContextLoggedIn() {
   return useContext(LoggedInContext)
}

export function useContextUpdateLoggedIn() {
   return useContext(UpdateLoggedInContext)
}

export function useContextUpdateLoggedOut() {
   return useContext(UpdateLoggedOutContext)
}

export function useContextUserId() {
   return useContext(UserIdContext)
}

export function useContextUpdateUserId() {
   return useContext(UpdateUserIdContext)
}

export function useContextAccessToken() {
   return useContext(AccessToken)
}

export function useContextUpdateAccessToken() {
   return useContext(UpdateAccessToken)
}

export function useContextName() {
   return useContext(Name)
}

export function useContextUpdateName() {
   return useContext(UpdateName)
}

export function useContextCurrQuote() {
   return useContext(CurrQuote)
}

export function useContextUpdateCurrQuote() {
   return useContext(UpdateCurrQuote)
}

export function useContextCurrAuthor() {
   return useContext(CurrAuthor)
}

export function useContextUpdateCurrAuthor() {
   return useContext(UpdateCurrAuthor)
}

export function useContextCount() {
   return useContext(Count)
}

export function useContextUpdateCount() {
   return useContext(UpdateCount)
}

export function useContextDisplayQuote() {
   return useContext(DisplayQuote)
}

export function useContextUpdateDisplayQuote() {
   return useContext(UpdateDisplayQuote)
}

export function useContextDisplayAuthor() {
   return useContext(DisplayAuthor)
}

export function useContextUpdateDisplayAuthor() {
   return useContext(UpdateDisplayAuthor)
}



export function ContextProvider({ children }) {

   const [loggedIn, setLoggedIn] = useState(false)
   const [userId, setUserId] = useState('')
   const [accessToken, setAccessToken] = useState('')
   const [name, setName] = useState('')
   const [currQuote, setCurrQuote] = useState('')
   const [currAuthor, setCurrAuthor] = useState('')
   const [count, setCount] = useState(0)
   const [displayQuote, setDisplayQuote] = useState(null)
   const [displayAuthor, setDisplayAuthor] = useState(null)


   function updateLoggedIn() {
      setLoggedIn(true)
   }

   function updateLoggedOut() {
      setLoggedIn(false)
   }

   function updateUserId(id) {
      setUserId(id)
   }

   function updateAccessToken(token) {
      setAccessToken(token)
   }

   function updateName(name) {
      setName(name)
   }

   function updateCurrQuote(quote) {
      setCurrQuote(quote)
   }

   function updateCurrAuthor(author) {
      setCurrAuthor(author)
   }

   function updateCount(num) {
      setCount(num)
   }

   function updateDisplayQuote(quote) {
      setDisplayQuote(quote)
   }

   function updateDisplayAuthor(author) {
      setDisplayAuthor(author)
   }


   return (
      <LoggedInContext.Provider value={loggedIn}>
         <UpdateLoggedInContext.Provider value={updateLoggedIn}>
            <UpdateLoggedOutContext.Provider value={updateLoggedOut}>
               <UserIdContext.Provider value={userId}>
                  <UpdateUserIdContext.Provider value={updateUserId}>
                     <AccessToken.Provider value={accessToken}>
                        <UpdateAccessToken.Provider value={updateAccessToken}>
                           <Name.Provider value={name}>
                              <UpdateName.Provider value={updateName}>
                                 <CurrQuote.Provider value={currQuote}>
                                    <UpdateCurrQuote.Provider value={updateCurrQuote}>
                                       <CurrAuthor.Provider value={currAuthor}>
                                          <UpdateCurrAuthor.Provider value={updateCurrAuthor}>
                                             <Count.Provider value={count}>
                                                <UpdateCount.Provider value={updateCount}>
                                                   <UpdateDisplayQuote.Provider value={updateDisplayQuote}>
                                                      <DisplayQuote.Provider value={displayQuote}>
                                                         <DisplayAuthor.Provider value={displayAuthor}>
                                                            <UpdateDisplayAuthor.Provider value={updateDisplayAuthor}>
                                                               {children}
                                                            </UpdateDisplayAuthor.Provider>
                                                         </DisplayAuthor.Provider>
                                                      </DisplayQuote.Provider>
                                                   </UpdateDisplayQuote.Provider>
                                                </UpdateCount.Provider>
                                             </Count.Provider>
                                          </UpdateCurrAuthor.Provider>
                                       </CurrAuthor.Provider>
                                    </UpdateCurrQuote.Provider>
                                 </CurrQuote.Provider>
                              </UpdateName.Provider>
                           </Name.Provider>
                        </UpdateAccessToken.Provider>
                     </AccessToken.Provider>
                  </UpdateUserIdContext.Provider>
               </UserIdContext.Provider>
            </UpdateLoggedOutContext.Provider>
         </UpdateLoggedInContext.Provider>
      </LoggedInContext.Provider>
   )
}