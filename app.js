(async function() {
  const response = await fetch("./data.json");
  const movies = await response.json();

  let searchValue = document.getElementById("searchMovie");
  let searchBtn = document.getElementById("searchBtn");
  let movieList = document.getElementById("movie-list");
  let movieDetails = document.getElementById("moviesDetailsContainer");
  
  let displaySearchResult = (result)=> {
    movieList.innerHTML = "";
    result.forEach(function(movie) {
      const li = document.createElement("li");
      const ListItem = `
        <h2 className="title">${movie.title}</h2>
        <img src="${movie.poster_path}" alt="${movie.title}">
        <div className="description">${movie.genres}</div>
        <div className="description"><b>Languages: </b>${movie.original_language}</div>
        <div className="description"><b>Cast: </b>${movie.cast
          .map(actor => actor.name)
          .join(", ")}</div>
            <div className="description"><b>Release Date: </b>${movie.release_date}</div>
        `;

      li.innerHTML = ListItem;
      li.addEventListener("click", function() {
        loadMovieDetails(movie);
      });
      movieList.appendChild(li);
    });
    displaySearchResult(result);
    console.log(result);
  }

  // function loadMovieDetails(movies) {
  //   containerEl.innerHTML = `
  //       <h2 class="title">${movies.title}</h2>
  //       <h3>Genres:</h3>
  //       <ul>${movies.genres.map(function (ingredient) {
  //         return "<li>" + ingredient + "</li>"
  //       }).join("")}</ul>
  //       <h3>Overview:</h3>
  //       <div>${movies.overview}</div>
  //       <h3>Run Time:</h3>
  //       <div>${movies.runtime}</div>
  //       <h3>Budget:</h3>
  //       <div>${movies.budget} $</div>
  //       <h3>Revenue:</h3>
  //       <div>${movies.revenue} $</div>
  //       <h3>Rating:</h3>
  //       <div>${movies.vote_average} </div>
  //       <h3>Popularity:</h3>
  //       <div>${movies.popularity} </div>
  //       <h3>Directors:</h3>
  //       <div className="description">${movies.directors.map(directors => directors.name)          
  //           .join(", ")}</div>
  //       <h3>Writers:</h3>
  //       <div className="description">${movies.writers.map(directors => directors.name)          
  //           .join(", ")}</div>

  //   `;
  // }
  
  let search = () => {
    let value = searchValue.value.toLowerCase();
    let result = movies.filter(function(movie) {
      let genresString = "";
      if (typeof movie.genres === "string") {
        genresString = movie.genres.toLowerCase();
      } else if (Array.isArray(movie.genres)) {
        genresString = movie.genres.join(" ").toLowerCase();
      }
    // console.log(result);

      return (
        movie.title.toLowerCase().includes(value) ||
        movie.original_language.toLowerCase().includes(value) ||
        genresString.includes(value) ||
        movie.tagline.toLowerCase().includes(value) ||
        movie.overview.toLowerCase().includes(value)
      );
    });
    
  };
  
  
searchBtn.addEventListener("click",search);

})();
