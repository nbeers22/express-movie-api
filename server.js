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
    console.log("not equal")
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

app.listen(4000, () => {
  console.log(`Server started on port:4000`);
});