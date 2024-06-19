class MissingFieldsError extends Error {}

class ExistingDataError extends Error {}

class DataNotFoundError extends Error {}

module.exports = {
	MissingFieldsError,
    ExistingDataError,
    DataNotFoundError
}
