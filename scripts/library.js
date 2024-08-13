import { getBookInfo } from "./bookAPI.js";
import { resultContainer } from "../index.js";

const library = [];

// Book constructor
function Book(title, author, pages, img, isReaded) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.isReaded = isReaded;
}

async function searchBook(title, author, isReaded, bookIndexPromise) {
  try {
    const data = await getBookInfo(`${title}${author}`);

    // Object containing the data for the book card
    const bookInfo = data.items.map((info) => {
      return {
        title: info.volumeInfo.title,
        author: info.volumeInfo.authors ? info.volumeInfo.authors : "Unknown",
        pages: info.volumeInfo.pageCount,
        // stock image thumbnail in case a book doesn't have one
        imgLink: info.volumeInfo.imageLinks ? info.volumeInfo.imageLinks.thumbnail : `./image/stock-book-img.jpg`,
      };
    });

    showResults(bookInfo);
    const index = await bookIndexPromise;

    // push the book info into the library array
    addToLibrary(
      bookInfo[index].title,
      bookInfo[index].author,
      bookInfo[index].pages,
      bookInfo[index].imgLink,
      isReaded
    );
  } catch (error) {
    throw error;
  }
}

// Content of the Results dialog to make the user choose the desired book
function showResults(bookInfo) {
  // Reset the results before adding new ones
  resultContainer.innerHTML = "";

  bookInfo.forEach((book, index) => {
    const title = `<p class="result-title">${book.title}</p>`;
    const author = `<p class="result-author">${book.author}</p>`;
    const pages = `<p class="result-pages">${book.pages}</p>`;
    const img = `<img src="${book.imgLink}" class="result-img" />`;
    const div = `<div class="result-div ${index}">${title} ${author} ${pages} ${img}</div>`;

    resultContainer.innerHTML += div;
  });
}

function addToLibrary(title, author, pages, img, isReaded) {
  const index = library.length;
  library[index] = new Book(title, author, pages, img, isReaded);
}

export { library, searchBook };
