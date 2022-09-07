const express = require('express');
const htmlRoute = require('./routes/htmlroutes');
const apiRoute = require('./routes/apiroutes');
const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/assets", express.static('./public/assets'));

app.use('/', htmlRoute);
app.use('/', apiRoute);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

