import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Venue from './pages/Venue';
import AddVenue from './pages/AddVenue';
import Account from './pages/Account';
import UserVenues from './pages/UserVenues';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue/:id" element={<Venue />} />
        <Route path="/profiles/:name/venues" element={<UserVenues />} />
        <Route path="/profile/:name" element={<Account />} />
        <Route path="/venue/add" element={<AddVenue />} />
      </Routes>
    </Layout>
  );
}

export default App;
