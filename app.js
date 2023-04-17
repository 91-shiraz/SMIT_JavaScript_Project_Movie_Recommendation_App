(async function() {
  const yearPicker = document.getElementById("yearpicker");
  const currentYear = new Date().getFullYear();
  const minYear = 1902;
  
  for (let year = currentYear; year >= minYear; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearPicker.appendChild(option);
  }

  const response = await fetch("./data.json");
  const allMovies = await response.json();

  let search = () => {
    rankColumnList.innerHTML = "";
    movieDetailsColumnList.innerHTML = "";
    yearColumnList.innerHTML = "";
    let searchString = document
      .getElementById("searchMovie")
      .value.toLowerCase();
    let results = allMovies.filter(movieName => {
      return movieName.title.toLowerCase().includes(searchString);
    });
    if (results.length == 0) {
      let newParagraph = document.createElement("li");
      newParagraph.innerHTML = `<p class="detailBox">No movies match your query.</p>`;
      movieDetailsColumnList.appendChild(newParagraph);
    } else {
      createMovieCards(results);
    }
    console.log(results);
  };

  let searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", search);

  let genre = document.getElementById("genre");
  let rate = document.getElementById("rate");
  let language = document.getElementById("language");

  let calculateRunTime = time => {
    let timeInHours = Math.floor(time / 60);
    let timeInMinutes = time - 60 * timeInHours;
    let timeString = timeInHours + " Hours " + timeInMinutes + " Mins";
    return timeString;
  };

  let createMovieCards = results => {
    for (let index = 0; index < results.length; index++) {
      let movie = document.createElement("li");
      let rank = document.createElement("li");
      let year = document.createElement("li");
      let count = index + 1;
      let movieYear = results[index].release_date.slice(0, 4);
      rank.innerHTML = `<div class="rankFromJs">${count}</div><br>`;
      movie.innerHTML = `<div class="movieFromJs">
            <img src="https://image.tmdb.org/t/p/w45${results[index]
              .poster_path}">
            <div class="movietitlefromJS">
                <h4 style="margin: 0px 0px 10px 0px;"><a target="_blank" style="color: black" href="https://www.imdb.com/title/${results[
                  index
                ].external_ids.imdb_id}">${results[index].title}</a></h4>
                <div>
                    <span class="certificationspanstyle">${results[index]
                      .certification}</span>
                    <span>${results[index].genres.toString(", ")}</span>
                </div>
                <div style="height: 100%;position:absolute; right: 5px; top:0px">
                    <h5 class="ratingDuration">Movie Rating:</h5>
                    <p class="ratingDurationAns">${results[index]
                      .vote_average}</p>
                    <h5 class="ratingDuration">Watch Time:</h5>
                    <p class="ratingDurationAns">${calculateRunTime(
                      results[index].runtime
                    )}</p>
                </div>
            </div>
        </div>
        <br>`;
      year.innerHTML = `<div class="rankFromJs">${movieYear}</div><br>`;
      rankColumnList.appendChild(rank);
      movieDetailsColumnList.appendChild(movie);
      yearColumnList.appendChild(year);
    }
  };

  let dropDownChange = () => {
    rankColumnList.innerHTML = "";
    movieDetailsColumnList.innerHTML = "";
    yearColumnList.innerHTML = "";

    let results;

    requiredLanguage = language.value;
    if (requiredLanguage == "All") {
      requiredLanguage = "";
    }
    results = allMovies.filter(movieName => {
      return movieName.original_language.includes(requiredLanguage);
    });

    requiredRating = rate.value;
    if (requiredRating == "All") {
      requiredRating = 0;
      results = results.filter(movieName => {
        return movieName.vote_average >= requiredRating;
      });
    } else {
      results = results.filter(movieName => {
        return movieName.vote_average == requiredRating;
      });
    }

    requiredYear = yearPicker.value;
    if (requiredYear != "All") {
      results = results.filter(movieName => {
        return movieName.release_date.includes(requiredYear);
      });
    }

    requiredGenre = genre.value;
    if (requiredGenre != "All") {
      results = results.filter(movieName => {
        return movieName.genres.includes(requiredGenre);
      });
    }

    if (results.length == 0) {
      let newParagraph = document.createElement("li");
      newParagraph.innerHTML = `<p class="detailBox">No movies match your query.</p>`;
      movieDetailsColumnList.appendChild(newParagraph);
    } else {
      createMovieCards(results);
    }
  };
  dropDownChange();

  genre.addEventListener("change", dropDownChange);
  rate.addEventListener("change", dropDownChange);
  yearPicker.addEventListener("change", dropDownChange);
  language.addEventListener("change", dropDownChange);
})();
