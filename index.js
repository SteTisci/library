const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const confirmBtn = document.querySelector("button[type='submit']");
const cancelBtn = document.querySelector(".cancel");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const main = document.querySelector(".main");

const library = [];

// Book constructor
function Book(title, author) {
  this.title = title;
  this.author = author;
}

addBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());
confirmBtn.addEventListener("click", () => appendBookInfo());

function appendBookInfo() {
  const bookCard = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("p");

  bookCard.setAttribute("class", "book-card");
  title.setAttribute("class", "book-title");
  author.setAttribute("class", "book-author");

  if (titleInput.value && authorInput.value) {
    title.textContent = titleInput.value;
    author.textContent = authorInput.value;

    // Reset the inputs
    titleInput.value = "";
    authorInput.value = "";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    main.appendChild(bookCard);

    addToLibrary(title.textContent, author.textContent);
  }
}

function addToLibrary(title, author) {
  const index = library.length;
  library[index] = new Book(title, author);
}

// TODO: gestione libri da leggere e gia letti
// TODO: Aggiungere book API
// TODO: gestione richieste API -> da vedere parametri
// TODO: modifica libreria con info da API
// TODO: mostrare info API su pagina html -> immagine, titolo, autore, pagine
// TODO: stile generale -> ? modale per info libro quando passi il mouse ?
// TODO: da integrare con node e capire come fare funzionare tutto
