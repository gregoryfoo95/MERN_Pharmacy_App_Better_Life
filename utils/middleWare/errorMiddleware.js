const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: import.meta.env.NODE_ENV === "development" ? err.stack : null,
    });
  };
  
  module.exports = errorHandler;
  