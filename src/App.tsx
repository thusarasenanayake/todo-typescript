import Home from './pages/Home';
import Todo from './pages/Todo';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Router>
        <div className="container mt-4">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todo />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
