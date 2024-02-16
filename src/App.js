import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route index element={<Public></Public>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        
        <Route path='/dash' element={<DashLayout></DashLayout>}>

          <Route index element={<Welcome></Welcome>}></Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
