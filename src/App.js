import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
  import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
        <Route path={"/forgetpassword"} element={<ForgetPassword />}></Route>
        <Route path={"/resetpassword/:token"} element={<ResetPassword />}></Route>
        <Route path={"/dashboard"} element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
