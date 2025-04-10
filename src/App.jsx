import { useEffect,useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Search from './components/search.jsx'
import MovieCard from './components/MovieCard.jsx';
const API_BASE_URL= 'https://api.themoviedb.org/3';
const API_KEY= import.meta.env.VITE_TMDB_KEY;
const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App= ()=>{
  const [searchTerm,setSearchTerm] = useState('');
  const [movieList, setMovieList]= useState([]);
  const [errorMessage, setErrorMessage]= useState('');
  const [isLoading, setIsLoading] = useState(false);


  const fetchMovies = async (query='') =>{
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint=query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);
      
      if(!response.ok){
        throw new Error('Failed to Fetch Movies');
      }

      const data= await response.json();
      
      if(data.Response==='False'){
          setErrorMessage(data.Error || 'Failed to Fetch Movies');
          setMovieList([]);
          return;
      }

      setMovieList(data.results || []);
      

    }catch(error){
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }finally{
      setIsLoading(false);
    }

  };
  useEffect(()=>{
    fetchMovies(searchTerm)
  },[searchTerm]);

  return(
    <main>
      <div className="pattern"/>
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt="Hero Banner"></img>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the hassel</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ): errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
        
        
      </div>
    </main>
  )
}

export default App
