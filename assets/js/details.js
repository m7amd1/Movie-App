const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const hero = document.querySelector("section.hero");
const addToFavBtn = document.querySelector('a#fav-btn'); 
let fav = JSON.parse(localStorage.getItem('favMovies'));


let movie = {};
const getMovie = async (id)=>{
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWY4MmY1NzEwMjAxYzkxZjczZWM3OTUyNWY3MjRhZiIsIm5iZiI6MTczMDIzNTE1NS43MTEzOTcsInN1YiI6IjY3MWZjY2Y0MzRjMGZhYmQ2ODFkMzA5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aoHuGtLuVarHl_uYIjalUszrbWpXCzdur-tcC-1nEE'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        movie =  json;
        const year = movie.release_date.split('-')[0];
        hero.querySelector("#info").innerHTML=`
        <li><i class="fa-regular fa-star"></i>${movie.vote_average.toFixed(1)}</li>
              <span>• </span>
              <li>${movie.genres[0].name}</li>
              <span>• </span>
              <li>${year}</li>
              <span>• </span>
              <li>${movie.runtime}min</li>
              <span>• </span>
              <li>16+</li>
        `;
        hero.querySelector("#title").textContent=movie.title;
        hero.querySelector('#overview').textContent=movie.overview;
        hero.querySelector('.bg').style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

      })
      .catch(err => console.error(err));
}

const checkFav = () => {



  addToFavBtn.innerHTML=`
  <i class="fa-regular fa-bookmark"></i>
             <span>Remove from favorites</span>
 `;
  addToFavBtn.querySelector('i').style.color = 'yellow';
  

};


document.addEventListener('DOMContentLoaded',()=>{
  getMovie(id)
  

})

const toggleMovie = (event, id) => {
  event.preventDefault();
  
  
  
  const favIndex = fav.findIndex((favMovie) => favMovie.id === id);
  
  

  if (favIndex !== -1) {
    fav.splice(favIndex, 1);
    addToFavBtn.innerHTML=`
   <i class="fa-regular fa-bookmark"></i>
              <span>Add to favorites</span>
  `;
    
   
  } else {
    fav.push(movie);
    addToFavBtn.innerHTML=`
    <i class="fa-regular fa-bookmark"></i>
      <span>Remove from favorites</span>

   `;
   addToFavBtn.querySelector('i').style.color='yellow';
    
  }

  localStorage.setItem("favMovies", JSON.stringify(fav));
 
};

addToFavBtn.addEventListener('click',(event)=>{toggleMovie(event,movie.id)})
