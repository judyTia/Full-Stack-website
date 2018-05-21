const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bey: 'buddy'});
});



const PORT = process.env.PORT || 7000;
app.listen(PORT); 