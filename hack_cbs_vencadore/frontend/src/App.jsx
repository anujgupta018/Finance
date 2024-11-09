import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Goal from './pages/Goal';
import Transactions from './pages/Transaction';
import Settings from './pages/Setting';
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div
     initial={{x:'-100vw'}}
     animate={{x:0}}
     transition={{type:'spring',stiffness:50,damping:20,duration:3}}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Goal-Manager" element={<Goal />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/Setting" element={<Settings />} />
      </Routes>
    </motion.div>
  );
}

export default App;
