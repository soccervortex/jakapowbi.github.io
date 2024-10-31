const apiKey = 'GBUghdHlZ_gnLezb';
const apiUrl = `https://movieapi-v2ft.onrender.com/api/movies`;
const searchApiUrl = `https://movieapi-v2ft.onrender.com/api/search/`;
const movieGallery = document.getElementById('movie-gallery');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');

// Fetch all movies initially
fetchMovies(apiUrl);

// Event listener for input changes in the search input
searchInput.addEventListener('input', () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        // Fetch movies based on search input
        fetchMovies(`${searchApiUrl}${movieName}`);
    } else {
        // Fetch all movies if search input is empty
        fetchMovies(apiUrl);
    }
});

async function fetchMovies(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        showError('Error loading movies. Please try again later.');
    }
}

function displayMovies(movies) {
    if (!Array.isArray(movies) || movies.length === 0) {
        showError('No movies found.');
        return;
    }

    // Sort movies by year in descending order (latest first)
    movies.sort((a, b) => {
        return parseInt(b.year) - parseInt(a.year);
    });

    movieGallery.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Start building the movie card content
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
        `;

        // Conditionally append year if available
        if (movie.year) {
            movieCard.innerHTML += `<h3 class="year">${movie.year}</h3>`;
        }

        // Close the movie info div
        movieCard.innerHTML += `</div>`;

        movieGallery.appendChild(movieCard);
    });
}

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

// Call the function to fetch movies on page load
fetchMovies(apiUrl);
