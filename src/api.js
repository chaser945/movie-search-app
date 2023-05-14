const getPopularMovies = async () => {
    const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=6af31bc37cbb2436640ecaf1e1265fdc"
    )

    console.log(response)

    if (!response.ok) {
        throw {
            message: "An error occured"
        }
    }

    const data = await response.json()

    console.log(data)

    return data
};

export { getPopularMovies }