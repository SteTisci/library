import { library } from "./library.js";

// Saves the books in the localStorage
function addToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(library));
}

// Load the books from the localStorage an push them in the library array
function loadFromLocalStorage() {
  const booksFromStorage = localStorage.getItem("books");

  if (booksFromStorage) {
    const storedBooks = JSON.parse(booksFromStorage);
    storedBooks.forEach((book) => library.push(book));
  }
}

export { addToLocalStorage, loadFromLocalStorage };
