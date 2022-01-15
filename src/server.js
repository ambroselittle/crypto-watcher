const express = require('express');
const { isDevEnv } = require('./lib/env');

const app = express();
const port = process.env.PORT || 9090;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', require('./api/routes'));

const listener = app.listen(port, () => {
    const actualPort = listener.address().port;
    if (isDevEnv()) {
        console.log(`Server running on http://localhost:${actualPort}/`); // for clickability in console
    } else {
        console.log('Server running on port: ' + actualPort);
    }
});