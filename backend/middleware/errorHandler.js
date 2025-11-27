export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered",
      field: Object.keys(err.keyValue)[0],
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};

// ✅ IMPORTANT FIX:
export default errorHandler;
