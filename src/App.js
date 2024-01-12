// import React from 'react';
// import './App.css';
// import Signup from './Pages/Signup'
// import { BrowserRouter as Router,Route } from 'react-router-dom/';

// /**
//  * ?  =====Import Components=====
//  */
// import Home from './Pages/Home';

// function App() {
//   return (
   
//     <div>
      
//     <Router>
//       <Route exact path='/'>
//       <Home />
//       </Route>
//       <Route  path='/signup'>
//       <Signup/>
//       </Route>
//       </Router>
//     </div>
   
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context, { AuthContext,FirebaseContext } from './Store/Context';
import View from './Pages/ViewPost'

import Post from'./Store/PostContext'

/**
 * ? ===== Import Components =====
 */
import Home from './Pages/Home';
import { useContext, useEffect } from 'react';

function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    // console.log(user)
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[])
  return (
    
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </Router>
      </Post>
    </div>
    
  );
}

export default App;
