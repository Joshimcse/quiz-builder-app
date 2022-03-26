import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import AddQuiz from './pages/AddQuiz';
import EditQuiz from './pages/EditQuiz';
import ViewQuiz from './pages/ViewQuiz';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/edit/:quizId" element={<EditQuiz />} />
        <Route path="/view/:quizId" element={<ViewQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
