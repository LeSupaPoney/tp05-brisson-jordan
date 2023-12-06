const express = require('express');
const path = require('path');

const app = express();
//const PORT = 8080;

app.use(express.static(path.join(__dirname, '/dist/tp05_brisson_jordan')));
app.get('/*', function(req, res) {
res.sendFile(path.join(__dirname, '/dist/tp05_brisson_jordan/index.html'));
});

app.listen(process.env.PORT || 8080);
