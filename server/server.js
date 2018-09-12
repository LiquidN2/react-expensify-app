const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// require('dotenv').config({ path: './.env.development'});
// process.env.APP_VERSION = '1.5';

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);    
});

// console.log(process.env.FIREBASE_PROJECT_ID);