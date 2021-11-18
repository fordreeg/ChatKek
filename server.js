const express = require('express'),
    app = express();

const rooms = {
    'rooms': [],
    messages: ['hello']
}
app.get('/rooms', (request, res) => {
    res.json(rooms)
});



app.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен')
})