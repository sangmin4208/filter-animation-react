import './App.css'
import { useEffect, useState } from 'react'
import Movie from './components/Movie'
import Filter from './components/Filter'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [popular, setPopular] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState(0)
  const fetchPopular = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=8ab900821b609fea06077e7066635b87&language=en-US&page=1'
    )
    const movies = await data.json()
    setPopular(movies.results)
    setFiltered(movies.results)
  }
  useEffect(() => {
    fetchPopular()
  }, [])
  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default App
