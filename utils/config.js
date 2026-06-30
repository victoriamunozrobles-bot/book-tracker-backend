const { NODE_ENV, MONGODB_URI, JWT_SECRET } = process.env;

module.exports = {
  MONGO_URI:
    NODE_ENV === "production"
      ? MONGODB_URI
      : "mongodb://127.0.0.1:27017/book_tracker_db",
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "dev-secret-key"
};
