const allowedOrigins = [
  "http://localhost:3000",
  "https://qazini-jobs.vercel.app",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
