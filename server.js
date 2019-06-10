const app = require('./app.js');
const MOVIES = require('./movies-data.json');

app.use(function authorizeApp(req,res,next){
  const bearerToken = req.get('Authorization').split(" ")[1];
  const apiToken = process.env.API_TOKEN;

  if(!bearerToken){
    return res.status(401).json({
      error: "Must pass token as a header"
    })
  }

  if(bearerToken !== apiToken){
    return res.status(401).json({
      error: "Unauthorized Request - Bad Token"
    });
  }
  next();
});

const handleGetMovie = (req,res) => {
  const { genre,country,avg_vote } = req.query;
  
  if(genre){
    const moviesByGenre = MOVIES.filter( movie => (
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    ));
    return res.json(moviesByGenre);
  }
  
  if(country){
    const moviesByCountry = MOVIES.filter( movie => (
      movie.country.toLowerCase().includes(country.toLowerCase())
    ));
    return res.json(moviesByCountry);
  }
  
  if(avg_vote){
    const moviesByVote = MOVIES.filter( movie => (
      +movie.avg_vote >= +avg_vote
    ));
    return res.json(moviesByVote);
  }

  res.json(MOVIES);
}

app.get('/movie',handleGetMovie);

app.use((error,req,res,next) => {
  let response;
  if (process.env.NODE_ENV){
    response = {error: { message: "server error"}}
  }else{
    response = { error }
  }
  res.status(500).json(response)
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {});