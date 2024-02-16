import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './components/Login';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route index element={<Public></Public>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
