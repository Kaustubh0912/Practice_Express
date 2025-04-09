const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errHandler')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const rootRouter = require('./routes/root')
const empRouter = require('./routes/api/employees')

const app = express();
const port = process.env.PORT || 3000;

//(built in middleware)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))



//(custom middleware)
app.use(logger)
//3rd party middleware

app.use(cors(corsOptions))

//route
app.use('/', rootRouter)
app.use('/api/employees', empRouter)


app.use(errorHandler)

app.all(/\/*/, (req, res) => {
    res.status(404)
    if (req.accepts('html'))
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    else if (req.accepts('json'))
        res.send({ error: "404 Not Found" })
    else
        res.type('txt').send('404 not found')
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

