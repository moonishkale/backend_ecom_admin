import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//global error handler
app.use((error, req, res, next) => {
  try {
    console.log(error.message);
    const errorCode = error.errorCode || 500;

    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.status(5000).json({
      status: "error",
      message: error.message,
    });
  }
});

//uncaught router request
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Requested resources not found!",
  };
  next(error);
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
