'use strict';

const serverVersion = 'Version 1.01';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: './public' });
});

app.listen(PORT, () => {
    console.log('Listening on port:', PORT, 'use CTRL+C to close.');
    console.log('Server started:', new Date());
    console.log('Currently running on', serverVersion);
});