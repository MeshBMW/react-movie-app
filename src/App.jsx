import { Route, Routes} from 'react-router-dom'
import MovieDetails from './pages/MovieDetails.jsx'
import HomePage from "./pages/HomePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore/:type" element={<ExplorePage />} />
      <Route path="/movie/:id" element={<MovieDetails mediaType="movie" />} />
      <Route path="/tv/:id" element={<MovieDetails mediaType="tv" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
export default App