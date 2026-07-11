import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import MovieDetails from './components/MovieDetails.jsx'
import HomePage from "./HomePage.jsx";

function MovieDetailsPage() {
  const { movieId } = useParams();

  return <MovieDetails movieId={movieId} />;
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
  )
}
export default App
