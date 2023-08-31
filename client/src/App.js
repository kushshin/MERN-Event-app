import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import CreateEvent from './Pages/CreateEvent';
import SavedEvent from './Pages/SavedEvent';
import NavTab from './Components/NavTab';
// import Single from './Pages/Single'

function App() {
  return (
    <div className="App">
      <Router>
        <NavTab />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/savedEvent" element={<SavedEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
