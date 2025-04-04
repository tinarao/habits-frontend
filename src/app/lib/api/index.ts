export const getApiRoute = (path: string) => {
  const baseUrl =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

  return baseUrl + path;
};
