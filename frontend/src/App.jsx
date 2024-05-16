import React from 'react'
import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from "react-redux";
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import AnalyzesResult from './components/AnalyzesResult'
import { fetchAuthMe } from './Store/Slices/profile';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='signin' element={<SignIn/>}></Route>
          <Route path='signup' element={<SignUp/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='analyzesresult' element={<AnalyzesResult/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
