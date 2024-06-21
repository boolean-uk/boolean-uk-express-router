class MissingFieldError extends Error {}

class DataError extends Error {}

class NotFoundError extends Error {
}

module.exports = {
  MissingFieldError,
  DataError,
  NotFoundError,
};
