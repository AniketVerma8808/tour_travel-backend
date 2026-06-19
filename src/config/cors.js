const corsConfig = {
  origin: "*", // production me frontend URL dalna
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

export default corsConfig;