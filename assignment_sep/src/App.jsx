import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


// Import Pages
import Home from './pages/Home'
import Todo from './pages/Todo'
import Genre from './pages/Genre'
import Sidebar from './pages/Sidebar'
// import Sidebar from './components/sidebar'
const App = () => {
  return (
    <BrowserRouter>
    {/* <Sidebar/> */}
    <Routes>
      <Route path="/" element={<Sidebar/>}>
       <Route index element={<Home/>} />
       <Route path='/todo' element={<Todo/>} />
        <Route path='/genre' element={<Genre/>} />
      </Route>
        {/* <Route path='/' element={<Home/>} />
        <Route path='/todo' element={<Todo/>} />
        <Route path='/genre' element={<Genre/>} /> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
