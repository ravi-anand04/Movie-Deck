const API_URL = "0ccf42b563e9163039e2af471107c917";

document.onreadystatechange = () => {
  fetchMovies();
  renderFavourites();
};

async function fetchMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1"
  );
  const data = await response.json();
  displayMovies(data);
  //   console.log(data);
}

const allFavourites = document.getElementById("favourites");

function renderFavourites() {
  let prevData = JSON.parse(localStorage.getItem("fav_movies"));
  console.log("Favourite Movies", prevData);

  prevData &&
    prevData.map((movie) => {
      const {
        poster_path,
        title,
        average: vote_average,
        count: vote_count,
      } = movie;
      const card = document.createElement("div");
      const img = document.createElement("img");
      const image = `https://image.tmdb.org/t/p/original/${poster_path}`;
      img.src = image;
      img.classList.add("image");
      const movieTitle = document.createElement("h5");
      movieTitle.classList.add("title");
      const details = document.createElement("div");
      details.classList.add("details");
      const rating = document.createElement("div");
      const favourite = document.createElement("div");

      const count = document.createElement("p");
      const average = document.createElement("p");

      movieTitle.innerText = `${title}`;
      count.innerText = `Rating: ${vote_count}`;
      average.innerText = `Votes: ${vote_average}`;
      rating.append(count);
      rating.append(average);
      favourite.innerText = "♡";
      favourite.className = "favourite";
      details.appendChild(rating);
      card.classList.add("card");
      details.appendChild(favourite);
      card.appendChild(img);
      card.appendChild(movieTitle);
      card.appendChild(details);
      allFavourites.appendChild(card);
    });
}

const allMovies = document.getElementById("all");

function displayMovies(data) {
  {
    data.results &&
      data.results.map((movie) => {
        const { poster_path, title, vote_average, vote_count } = movie;
        const card = document.createElement("div");
        const img = document.createElement("img");
        const image = `https://image.tmdb.org/t/p/original/${poster_path}`;
        img.src = image;
        img.classList.add("image");
        const movieTitle = document.createElement("h5");
        movieTitle.classList.add("title");
        const details = document.createElement("div");
        details.classList.add("details");
        const rating = document.createElement("div");
        const favourite = document.createElement("div");

        const count = document.createElement("p");
        const average = document.createElement("p");

        movieTitle.innerText = `${title}`;
        count.innerText = `Rating: ${vote_count}`;
        average.innerText = `Votes: ${vote_average}`;
        rating.append(count);
        rating.append(average);
        favourite.innerText = "♡";
        favourite.className = "favourite";
        details.appendChild(rating);
        card.classList.add("card");
        details.appendChild(favourite);
        card.appendChild(img);
        card.appendChild(movieTitle);
        card.appendChild(details);
        allMovies.appendChild(card);

        favourite.addEventListener("click", () => {
          const currentState = favourite.classList.contains("favourite")
            ? "favourite-clicked"
            : "favourite";
          favourite.className = currentState;

          // Code for adding favourite movie to localstorage and fav tab

          const movieObj = {
            title,
            poster_path,
            average: vote_average,
            count: vote_count,
          };

          let prevData = JSON.parse(localStorage.getItem("fav_movies")) || [];
          //   console.log(prevData);
          prevData.push(movieObj);
          const movieJSON = JSON.stringify(prevData);
          localStorage.setItem("fav_movies", movieJSON);
        });
      });
  }
}
