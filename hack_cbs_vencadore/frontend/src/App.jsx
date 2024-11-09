import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Goal from './pages/Goal';
import Transactions from './pages/Transaction';
import Settings from './pages/Setting';
import { motion ,AnimatePresence} from 'framer-motion';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  const location=useLocation();
  const pageTransition = {
    initial: { x: '-100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100vw', opacity: 0 },
    transition: { type: 'spring', stiffness: 70, damping: 20, duration: 3}
  };
  return (
    <Auth0Provider>
    <AnimatePresence>
    <motion.div
      key={location.pathname}
     initial="initial"
     animate="animate"
     exit="exit"
     variants={pageTransition}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Goal-Manager" element={<Goal />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/Setting" element={<Settings />} />
      </Routes>
    </motion.div>
    </AnimatePresence>
</Auth0Provider>
  );
}

export default App;
