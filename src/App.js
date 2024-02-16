import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route index element={<Public></Public>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        
        <Route path='dash' element={<DashLayout></DashLayout>}>

          <Route index element={<Welcome></Welcome>}></Route>
          
          <Route path='notes'>
            <Route index element={<NotesList></NotesList>}></Route>
          </Route>
          
          <Route path='users'>
            <Route index element={<UsersList></UsersList>}></Route>
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
