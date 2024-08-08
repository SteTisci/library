import { library, searchBook } from "./library.js";

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const readBtn = document.querySelector(".read-button");
const readIcon = document.querySelector(".read-icon");
const confirmBtn = document.querySelector("button[type='submit']");
const cancelBtn = document.querySelector(".cancel");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const main = document.querySelector(".main");

readBtn.addEventListener("click", () => toggleReaded(readBtn));
addBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());
confirmBtn.addEventListener("click", async () => await addBook());

// FIXME: event listenere su ion-icon non funziona da sostituire o trovare altra soluzione
if (library.length > 0) {
  readIcon.addEventListener("click", () => console.log("clicked!"));
}

async function addBook() {
  const isReaded = readBtn.classList.contains("readed") ? true : false;

  if (titleInput.value && authorInput.value) {
    try {
      await searchBook(titleInput.value, authorInput.value, isReaded);
      // Reset the inputs after every search
      titleInput.value = "";
      authorInput.value = "";

      // Delete the content before adding new books to avoid inserting the same ones multiple times
      main.innerHTML = "";

      appendBookInfo();
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

function appendBookInfo() {
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const img = `<img src="${book.img}" class="book-image"/>`;
    const title = `<p class="book-title">${book.title}</p>`;
    const author = `<p class="book-author">${book.author}</p>`;
    const pages = `<p class="book-pages">${book.pages} Pages</p>`;
    // Check if a book has been readed
    const read = book.isReaded
      ? `<ion-icon name="book" class="read-icon readed"></ion-icon>`
      : `<ion-icon name="book-outline" class="read-icon"></ion-icon>`;
    const remove = `<ion-icon name="close-circle" class="remove-icon"></ion-icon>`;

    bookCard.innerHTML = `<div class="book-info">${img}<div class="book-text">${title} by ${author}${pages}<div class="card-icons">${read}${remove}</div></div></div>`;
    main.appendChild(bookCard);
  });
}

function toggleReaded(button) {
  button.classList.toggle("readed");
}

// TODO: gestione libri da leggere e gia letti
// TODO: rimozione libri
// TODO: aggiungere localStorage per persistenza dati
// TODO: commenti generali per maggiore leggibilita'
