// import React, { useContext, useState, useEffect } from "react"
// import { auth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// ;

// const AuthContext = React.createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true)

//   function logout() {
//     return auth.signOut()
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     logout,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }