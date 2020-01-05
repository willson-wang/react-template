const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const httpProxy = require('http-proxy-middleware')

const app = express()
const config = require('../scripts/webpack/webpack.dev.config.js')
const runOpen = require('./runOpen')
const port = require('./port')
const compiler = webpack(config)
const proxyConfig = require('./proxy')

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // logLevel: 'warn',
    silent: true,
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true
    }
})

app.use(middleware)

app.use(webpackHotMiddleware(compiler))

// https://github.com/chimurai/http-proxy-middleware
var devProxy = httpProxy(proxyConfig)

app.use(proxyConfig.context, devProxy)

const fs = middleware.fileSystem

app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
            res.sendStatus(404)
        } else {
            res.send(file.toString())
        }
    })
})

app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
})

// Serve the files on port 3000.
app.listen(port, function(err) {
    if (err) {
        throw err
    }
    runOpen(`http://localhost:${port}`, {
        openPage: '/',
        open: ['google chrome', '--incognito']
    })
    console.log(`Example app listening on port ${port}!\n`)
})
