module.exports = function(err, req, res, next) {

    //log the exception here
    res.status(500).send(`Operation Failed with error message: ${err}`)

}