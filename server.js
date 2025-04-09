const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errHandler')
const cors = require('cors');
const subDirRouter = require('./routes/subdir')
const rootRouter =require('./routes/root')

const app = express();
const port = process.env.PORT || 3000;

//(built in middleware)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/',express.static(path.join(__dirname, '/public')))
app.use('/subdir',express.static(path.join(__dirname, '/public')))



//(custom middleware)
app.use(logger)
//route
app.use('/',rootRouter)
app.use('/subdir',subDirRouter)

//3rd party middleware
const whiteList = ['www.kcozy.works', 'www.google.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {

            callback(new Error("NOT ALLOWED BY CORS"))
        }

    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

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

