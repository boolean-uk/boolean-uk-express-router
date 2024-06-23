const { films: films } = require('../../data/index.js')

const getAllfilms = (req, res) => {
    res.json({
        films: films
    })
}

module.exports = getAllfilms