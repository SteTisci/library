import { library, getBookResults, showResults, addToLibrary } from "./scripts/library.js";
import { addToLocalStorage, loadFromLocalStorage } from "./scripts/localStorage.js";

const main = document.querySelector(".main"),
  searchDialog = document.querySelector(".book-search"),
  resultsDialog = document.querySelector(".results"),
  resultContainer = document.querySelector(".results-container"),
  errorDialog = document.querySelector(".error-dialog"),
  dialogReturn = document.querySelector(".return"),
  addBookBtn = document.querySelector(".add-book"),
  readBtn = document.querySelector(".read-button"),
  confirmBtn = document.querySelector("button[type='submit']"),
  cancelBtn = document.querySelector(".cancel"),
  titleInput = document.querySelector("#title-input"),
  authorInput = document.querySelector("#author-input");

// Loads the books present in the library on the page when it has been loaded
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

// when the user searches for a book, a dialog opens with the results
// or shown an error message if the book is not found
confirmBtn.addEventListener("click", async () => {
  try {
    if (titleInput.value && authorInput.value) {
      const results = await getBookResults(titleInput.value, authorInput.value);

      resultsDialog.showModal();
      resultContainer.innerHTML = "";
      resultContainer.innerHTML = showResults(results);
      // Reset the inputs after every search
      titleInput.value = "";
      authorInput.value = "";
    }
  } catch (error) {
    console.error(error);
    // open an error dialog if no results match the search
    searchDialog.close();
    resultsDialog.close();
    errorDialog.showModal();
  }
});

// Manages the selection of the book from the dialog containing the results of the searched book
resultContainer.addEventListener("click", (e) => {
  const isReaded = readBtn.classList.contains("readed") ? true : false;

  const chosenBook = e.target.closest(".result-div");
  const returnBtn = e.target.closest(".return");

  // Controls whether the user chooses a book or goes back
  if (chosenBook) {
    const title = chosenBook.children[0].innerHTML; // .result-title
    const author = chosenBook.children[1].innerHTML; // .result-author
    const pages = chosenBook.children[2].innerHTML; // .result-pages
    const img = chosenBook.children[3].src; // .result-img

    addToLibrary(title, author, pages, img, isReaded);
    resultsDialog.close();
    appendBookInfo();
  } else if (returnBtn) {
    resultsDialog.close();
    searchDialog.showModal();
  }
});

// Manages the read and the remove button in the bookCard
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
