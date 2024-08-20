import { getBookInfo } from "./bookAPI.js";

const library = [];

// Book constructor
function Book(title, author, pages, img, isReaded) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.isReaded = isReaded;
}

// Send the request to the API and retrive all the results of the searched book
async function getBookResults(title, author) {
  try {
    const data = await getBookInfo(`${title}${author}`);

    // Object containing the data for the book card
    const bookResults = data.items.map((info) => {
      return {
        title: info.volumeInfo.title,
        author: info.volumeInfo.authors ? info.volumeInfo.authors : "Unknown",
        pages: info.volumeInfo.pageCount,
        // stock image thumbnail in case a book doesn't have one
        imgLink: info.volumeInfo.imageLinks ? info.volumeInfo.imageLinks.thumbnail : `./image/stock-book-img.jpg`,
      };
    });
    return bookResults;
  } catch (error) {
    throw error;
  }
}

// Shows the books found by the request sent to the API
function showResults(bookResults) {
  let content = "";
  const returnBtn = `<button class="return" type="reset">Go Back</button>`;

  bookResults.forEach((book, index) => {
    const title = `<p class="result-title">${book.title}</p>`;
    const author = `<p class="result-author">${book.author}</p>`;
    const pages = `<p class="result-pages">${book.pages}</p>`;
    const img = `<img src="${book.imgLink}" class="result-img" />`;
    const div = `<div class="result-div ${index}">${title} ${author} ${pages} ${img}</div>`;

    content += div;
  });
  content += returnBtn;
  return content;
}

function addToLibrary(title, author, pages, img, isReaded) {
  const index = library.length;
  library[index] = new Book(title, author, pages, img, isReaded);
}

export { library, getBookResults, showResults, addToLibrary };
