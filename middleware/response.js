class Response {
  constructor(code, description, data) {
    (this.code = code),
      (this.description = description),
      (this.data = data)
  }
}
module.exports = Response;
