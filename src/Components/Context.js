import React, { useContext, useState } from 'react'

const LoggedInContext = React.createContext()
const UpdateLoggedInContext = React.createContext()
const UserIdContext = React.createContext()
const UpdateLoggedOutContext = React.createContext()
const UpdateUserIdContext = React.createContext()
const AccessToken = React.createContext()
const UpdateAccessToken = React.createContext()
const Counter = React.createContext()
const UpdateCounter = React.createContext()
const Name = React.createContext()
const UpdateName = React.createContext()


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

export function useContextCounter() {
 return useContext(Counter)
}

export function useContextUpdateCounter() {
 return useContext(UpdateCounter)
}

export function useContextName() {
 return useContext(Name)
}

export function useContextUpdateName() {
 return useContext(UpdateName)
}

export function ContextProvider({ children }) {

 const [loggedIn, setLoggedIn] = useState(false)
 const [userId, setUserId] = useState('')
 const [accessToken, setAccessToken] = useState('')
 const [counter, setCounter] = useState(0)
 const [name, setName] = useState('')

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

 function updateCounter() {
  setCounter(prev => prev += 1)
 }

 function updateName(name) {
  setName(name)
 }

 return (
  <LoggedInContext.Provider value={loggedIn}>
   <UpdateLoggedInContext.Provider value={updateLoggedIn}>
    <UpdateLoggedOutContext.Provider value={updateLoggedOut}>
     <UserIdContext.Provider value={userId}>
      <UpdateUserIdContext.Provider value={updateUserId}>
       <AccessToken.Provider value={accessToken}>
        <UpdateAccessToken.Provider value={updateAccessToken}>
         <Counter.Provider value={counter}>
          <UpdateCounter.Provider value={updateCounter}>
           <Name.Provider value={name}>
            <UpdateName.Provider value={updateName}>
            {children}
            </UpdateName.Provider>
           </Name.Provider>
          </UpdateCounter.Provider>
         </Counter.Provider>
        </UpdateAccessToken.Provider>
       </AccessToken.Provider>
      </UpdateUserIdContext.Provider>
     </UserIdContext.Provider>
    </UpdateLoggedOutContext.Provider>
   </UpdateLoggedInContext.Provider>
  </LoggedInContext.Provider>
 )
}