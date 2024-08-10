import { library, searchBook } from "./scripts/library.js";
import { addToLocalStorage, loadFromLocalStorage } from "./scripts/localStorage.js";

const main = document.querySelector(".main");
const dialog = document.querySelector(".book-search");
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
  // Prevent the dialog from closing when the button is clicked
  e.preventDefault();
  toggleReaded(readBtn);
});
addBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

// TODO: dialog per vedere i risutati della ricerca dopo che confirmBtn viene premuto
confirmBtn.addEventListener("click", async () => await addBook());

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

async function addBook() {
  const isReaded = readBtn.classList.contains("readed") ? true : false;

  if (titleInput.value && authorInput.value) {
    try {
      await searchBook(titleInput.value, authorInput.value, isReaded);

      // Reset the inputs after every search
      titleInput.value = "";
      authorInput.value = "";

      appendBookInfo();
    } catch (error) {
      console.error(error);
      // TODO: gestione dialog errore in caso di libro non trovato
      return;
    }
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

function toggleReaded(element) {
  element.classList.toggle("readed");
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

// TODO: commenti generali per maggiore leggibilita'
