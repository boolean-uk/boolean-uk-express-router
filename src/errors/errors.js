class MissingFieldsError extends Error{}

class NotFoundError extends Error{}

class AlreadyExistsError extends Error{}

module.exports = {MissingFieldsError, NotFoundError, AlreadyExistsError}
