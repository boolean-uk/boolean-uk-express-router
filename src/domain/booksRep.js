const { books } = require("../../data/index.js")
// const usersDb = require(users)

let newBkId = books.length + 1

const getAllBks = () => {
	return books
}

const createNewBk = (data) => {
	const newBk = data
	newBk.id = newBkId
	newUsrId += 1
	books.push(newBk)
}

const getBkById = (id) => {
	return books.find((b) => b.id === id)
}

const deleteBk = (id) => {
	const bookToDelete = books.find((b) => b.id === id)
	books = books.filter((b) => b.id !== id)

	return bookToDelete
}

const updateBkById = (id, data) => {
	const bookId = id
	const updatedBook = data
	updatedBook.id = bookId
	books.splice(bookId - 1, 1, updatedBook)
	return updatedUser
}

module.exports = {
	getAllBks,
	createNewBk,
	getBkById,
	deleteBk,
	updateBkById,
}
