const Request = <T>(
  url: string,
  headers: { [key: string]: string },
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
) => {
  return fetch(url, { method, headers })
    .then((response) => response.json() as Promise<T>)
    .catch((error) => {
      throw error;
    });
};

export default Request;
