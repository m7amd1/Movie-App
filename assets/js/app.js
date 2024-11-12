
let fav = JSON.parse(localStorage.getItem("favMovies")) || [];
const searchBtn = document.querySelector('.search-btn2');
const yearInput = document.querySelector("#year");
let movies = [];
const fragment = document.createDocumentFragment();
const cardsCotnainer = document.querySelector('#cards-container');
const searchInput = document.querySelector('#search-input');


// API section 
const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWY4MmY1NzEwMjAxYzkxZjczZWM3OTUyNWY3MjRhZiIsIm5iZiI6MTczMDEzNzY0MC4yMDAxOSwic3ViIjoiNjcxZmNjZjQzNGMwZmFiZDY4MWQzMDlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.39CfbuKrKF5pcQvz47IaNGlNZ8ub1MtLw0Nwxz0s3ts'
  }
};


async function fetchMovies() {
  try {
    const res = await fetch(url, options);
    let json = await res.json();
    movies = await json.results;
   
    displayMovies(movies);
  } catch (err) {
    console.error(err);
  }
}




const displayMovies = (array) => {
  cardsCotnainer.innerHTML = ""; 
  const fragment = document.createDocumentFragment(); 

  if (array && array.length > 0) {
    array.forEach(movie => {
      if (movie.poster_path && movie.vote_average > 0) {
        const card = document.createElement('a');
        card.href = `./pages/details.html?id=${movie.id}`;
        card.classList.add('card');
        card.dataset.id = movie.id;
        const year = movie.release_date.split('-')[0];
        
        card.innerHTML = `
          <div class="hidden-info">
            <button class="save-btn">
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="save-icon" fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                  fill="${fav.some((favMovie) => favMovie.id === movie.id) ? '#c3da0f' : '#2f80ed'}"></path>
              </svg>
            </button>
            <span class="rate">
              <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                  stroke="#2f80ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              ${movie.vote_average.toFixed(1)}
            </span>
          </div>

          <div class="black-glass"></div>
          <div class="card-cont">
            <svg class="play-icon" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="0.792"></circle>
              <path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="#ffffff" stroke-width="0.792"></path>
            </svg>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image" class="card-img" width="192" height="305" />
          </div>

          <div class="card-info">
            <h3 class="card-title">${movie.title}</h3>
            <ul class="info-list">
              <li class="info-item">${year}</li>
            </ul>
          </div>
        `;

        
        card.querySelector(".save-btn").addEventListener("click", (event) => {
          event.preventDefault();
          toggleMovie(event, movie.id);
        });

        fragment.appendChild(card); 
      }
    });
    cardsCotnainer.appendChild(fragment); 
  } else {
    cardsCotnainer.innerHTML = " <h1> No Results found</h1>";
   
  }
};


const toggleMovie = (event, id) => {
  event.preventDefault();
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
   
    return;
  }
  
  const movieEl = document.querySelector(`[data-id="${id}"]`);
  const favIndex = fav.findIndex((favMovie) => favMovie.id === id);
  const saveIcon = movieEl.querySelector(".save-icon");

  if (favIndex !== -1) {
    fav.splice(favIndex, 1);
    saveIcon.setAttribute("fill", "#2f80ed"); 
    
  } else {
    fav.push(movie);
    saveIcon.setAttribute("fill", "#c3da0f"); 
   
  }

  localStorage.setItem("favMovies", JSON.stringify(fav));
 
};

const searchMovie = async (query,year)=>{

  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&?include_adult=false&language=en-US&page=1${year ? "&primary_release_year="+year : "" }`;
  const searchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWY4MmY1NzEwMjAxYzkxZjczZWM3OTUyNWY3MjRhZiIsIm5iZiI6MTczMDEzNzY0MC4yMDAxOSwic3ViIjoiNjcxZmNjZjQzNGMwZmFiZDY4MWQzMDlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.39CfbuKrKF5pcQvz47IaNGlNZ8ub1MtLw0Nwxz0s3ts'
    }
  };
  
  fetch(searchUrl, searchOptions)
    .then(res => res.json())
    .then(json =>{
      
      movies = json.results;
      
      displayMovies(movies);
      } )
    .catch(err => console.error(err));
}


fetchMovies();

searchBtn.addEventListener('click',(event)=>{
  searchMovie(searchInput.value , yearInput.value )
})
