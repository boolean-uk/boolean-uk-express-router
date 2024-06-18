function findById(data, id) {
    const found = data.find((d) => d.id === id)
    return found
}

module.exports = {findById}