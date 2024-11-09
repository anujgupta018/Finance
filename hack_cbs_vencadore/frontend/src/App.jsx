import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import  Goal  from './pages/Goal';
import Transactions from './pages/Transaction';
import Settings from './pages/Setting';
function App() {
 

  return (
    <>
    <Routes>
     <Route path="/" element={<Home/>}></Route>
     <Route path="/Dashboard" element={<Dashboard/>}></Route>
     <Route path="/Goal-Manager" element={<Goal/>}></Route>
     <Route path="/transaction" element={<Transactions/>}></Route>
     <Route path="/Setting" element={<Settings/>}></Route>
    </Routes>
    </>
  )
}

export default App
