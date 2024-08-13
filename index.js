import { library, searchBook } from "./scripts/library.js";
import { addToLocalStorage, loadFromLocalStorage } from "./scripts/localStorage.js";

const main = document.querySelector(".main");
const searchDialog = document.querySelector(".book-search");
const resultsDialog = document.querySelector(".results");
const resultContainer = document.querySelector(".results-container");
const errorDialog = document.querySelector(".error-dialog");
const dialogReturn = document.querySelector(".return");
const addBookBtn = document.querySelector(".add-book");
const readBtn = document.querySelector(".read-button");
const confirmBtn = document.querySelector("button[type='submit']");
const cancelBtn = document.querySelector(".cancel");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  appendBookInfo();
});

readBtn.addEventListener("click", (e) => {
  // Prevent the dialog from closing when the readed button is clicked
  e.preventDefault();
  toggleReaded(readBtn);
});
addBookBtn.addEventListener("click", () => searchDialog.showModal());
cancelBtn.addEventListener("click", () => searchDialog.close());

// when the error dialog is closed it opens the search one
dialogReturn.addEventListener("click", () => {
  errorDialog.close();
  searchDialog.showModal();
});

confirmBtn.addEventListener("click", async () => {
  if (titleInput.value && authorInput.value) {
    resultsDialog.showModal();

    // FIXME: nel caso non si scelga nessun libro la promessa viene chiamata piu volte

    // Create a Promise that resolves when the user selects a book
    const bookIndex = new Promise((resolve) => {
      resultContainer.addEventListener("click", (e) => {
        const index = e.target.closest(".result-div").classList[1];
        resultsDialog.close();
        resolve(index);
      });
    });

    // Add the book with the selected index
    await addBook(bookIndex);
  }
});

// TODO: aggiungere un pulsante per tornare indietro in caso nessun libro corrisponda ai criteri scelti

// Manage the read and the remove button in the bookCard
main.addEventListener("click", (e) => {
  const bookCard = e.target.closest(".book-card");
  const readIcon = e.target.closest(".read-icon");
  const removeIcon = e.target.closest(".remove-icon");
  if (readIcon) {
    toggleReaded(readIcon);
    updateBookStatus(bookCard, readIcon);
  }
  if (removeIcon) {
    removeBook(bookCard);
  }
});

async function addBook(bookIndexPromise) {
  const isReaded = readBtn.classList.contains("readed") ? true : false;

  try {
    await searchBook(titleInput.value, authorInput.value, isReaded, bookIndexPromise);

    // Reset the inputs after every search
    titleInput.value = "";
    authorInput.value = "";

    appendBookInfo();
  } catch (error) {
    console.error(error);
    // open an error dialog if no results match the search
    searchDialog.close();
    resultsDialog.close();
    errorDialog.showModal();
  }
}

// Create the bookCard with the books in the library
function appendBookInfo() {
  // Delete the content before adding new books to avoid inserting the same ones multiple times
  main.innerHTML = "";

  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const img = `<img src="${book.img}" class="book-image"/>`;
    const title = `<p class="book-title">${book.title}</p>`;
    const author = `<p class="book-author">${book.author}</p>`;
    const pages = `<p class="book-pages">${book.pages} Pages</p>`;
    // Check if a book has been readed
    const read = book.isReaded
      ? `<ion-icon name="checkmark-outline" class="read-icon readed"></ion-icon>`
      : `<ion-icon name="checkmark-outline" class="read-icon"></ion-icon>`;
    const remove = `<ion-icon name="close-outline" class="remove-icon"></ion-icon>`;

    bookCard.innerHTML = `<div class="book-info">${img}<div class="book-text">${title} by ${author}${pages}<div class="card-icons">${read}${remove}</div></div></div>`;
    main.appendChild(bookCard);
  });
  addToLocalStorage();
}

// Remove the book from the library and the page
function removeBook(book) {
  const title = book.querySelector(".book-title");

  library.forEach((book, index) => {
    if (book.title === title.textContent) {
      library.splice(index, 1);
    }
  });
  book.remove();
  appendBookInfo();
}

// Update the readed status
function updateBookStatus(book, readIcon) {
  const title = book.querySelector(".book-title");

  library.forEach((book) => {
    if (book.title === title.textContent) {
      book.isReaded = readIcon.classList.contains("readed") ? true : false;
    }
  });
  addToLocalStorage();
}

function toggleReaded(element) {
  element.classList.toggle("readed");
}

// I need the dialog div that show the books results in the library.js to add them in it
export { resultContainer };
