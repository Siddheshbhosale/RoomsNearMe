import Navbar from "./pages/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roomate from "./pages/Roomate";
import Buy from "./pages/Buy";
import OnRent from "./pages/OnRent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./services/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path="/" element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/roomate' element={<Roomate />} />
          <Route path='/onrent' element={<OnRent />} />
          <Route path='/buy' element={<Buy />} />
        </Route>
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
