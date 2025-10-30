import { Route, Routes } from 'react-router';
import LoginPage from '~/pages/auth/login/Login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;

