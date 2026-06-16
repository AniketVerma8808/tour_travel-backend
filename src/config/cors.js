const corsConfig = {
  origin: "*", // production me frontend URL dalna
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default corsConfig;