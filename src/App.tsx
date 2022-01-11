import React from 'react';
import Home from './pages/Home';
import Todo from './pages/Todo';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const todos: Array<Todo> = [
  { title: 'Hello, World!', completed: true },
  { title: 'Finish maths homework', completed: false },
];

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo initialTodos={todos} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
