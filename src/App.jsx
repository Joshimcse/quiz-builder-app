import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import AddQuiz from './pages/AddQuiz';
import EditQuiz from './pages/EditQuiz';
import ViewQuiz from './pages/ViewQuiz';
import Dashboard from './pages/Dashboard';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/edit/:quizId" element={<EditQuiz />} />
        <Route path="/view/:quizId" element={<ViewQuiz />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
