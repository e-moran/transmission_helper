import app from './app';

const PORT = 80;

app.listen(PORT, () => {
    console.log('ExpressJS Server Listening on port ' + PORT);
});
