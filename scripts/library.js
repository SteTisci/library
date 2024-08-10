import { getBookInfo } from "./bookAPI.js";

export const library = [];

// Book constructor
function Book(title, author, pages, img, isReaded) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.isReaded = isReaded;
}

export async function searchBook(title, author, isReaded) {
  try {
    const data = await getBookInfo(`${title}${author}`);

    // Object containing the data for the book card
    const bookInfo = data.items.map((info) => {
      return {
        title: info.volumeInfo.title,
        author: info.volumeInfo.authors,
        pages: info.volumeInfo.pageCount,
        // stock image cover in case a book doesn't have one
        imgLink: info.volumeInfo.imageLinks ? info.volumeInfo.imageLinks.thumbnail : `./image/stock-book-img.jpg`,
      };
    });

    // TODO: fare scegliere all'utente il libro da inserire nella pagina web visto che bookInfo contiene piu risultati
    // TODO: aggiungere la scelta alla libreria -> gestire l'elemento scelto da bookInfo

    // push the book info into the library array
    addToLibrary(bookInfo[0].title, bookInfo[0].author[0], bookInfo[0].pages, bookInfo[0].imgLink, isReaded);
  } catch (error) {
    throw error;
  }
}

function addToLibrary(title, author, pages, img, isReaded) {
  const index = library.length;
  library[index] = new Book(title, author, pages, img, isReaded);
}
