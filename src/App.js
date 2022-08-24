import {BrowserRouter as Router, Routes,Link,Route,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavScrollExample from './components/NavBar2';
import AddFriend from './pages/AddFriend';
import Home from './pages/Home';


function App() {

  return (
<>
<NavScrollExample/>
<div className="container">

<Routes>
    <Route path="/" element={<Home />} />

    <Route path="/addfriend" element={<AddFriend />} />
    <Route path="/" element={<Home />} />

</Routes>

</div>
</>
  );
}

export default App;
