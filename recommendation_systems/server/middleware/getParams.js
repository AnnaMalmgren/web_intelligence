'use strict'

const getParams = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'user id missing in request' })
    }
    req.id = req.params.id
    req.results = req.query.result || 3
    next()
}


module.exports = getParams

