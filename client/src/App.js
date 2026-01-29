import './App.css';
import Activities from './components/Activities';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/' element={<Login></Login>}></Route>
       <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
       <Route path='/activities' element={<Activities></Activities>}></Route>
       <Route path='/tasks' element={<Tasks></Tasks>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
