import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'tailwindcss'
import {BrowserRouter} from "react-router-dom";
import {FavoritesProvider} from "./utils/FavoritesContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </BrowserRouter>
)