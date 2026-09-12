import { Route, Routes as Router } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails.jsx'
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetails mediaType="movie" />} />
      <Route path="/tv/:id" element={<MovieDetails mediaType="tv" />} />
      <Route path="*" element={<ErrorPage />} />
    </Router>
  )
}
export default App