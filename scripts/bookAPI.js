// Api call to get the data for the searched book
async function getBookInfo(parameters) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${parameters}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw Error(response.status);
  }
  const data = await response.json();
  return data;
}

export { getBookInfo };
