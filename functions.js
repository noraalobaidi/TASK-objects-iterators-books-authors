const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return books.find((book) => book.id === bookId);
}
// console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find(
    (author) => authorName.toLowerCase() === author.name.toLowerCase()
  );
}
// console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here

  return authors.map((a) => ({ author: a.name, bookCount: a.books.length }));
}

//console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  // Your code goes here
  let colorsOfBooks = books.map((book) => book.color); //all colors in books with duplicates
  let uniqueColors = [...new Set(colorsOfBooks)]; //convert array to set to remove duplicates
  let colorsArray = Array.from(uniqueColors);
  // let arrayAllColors = colorsArray.map((c) =>
  //   books.filter((book) => book.color === c)
  // );
  // let arrayAllColors = colorsArray.map((c) => ({
  //   colorr: c,
  //   bookTitle: books.map((book) => book.title && book.color === c),
  // }));
  // //console.log("allcolors updated test !!! ", arrayAllColors[0]);

  // let finalArray = arrayAllColors.map((col) => ({
  //   colorr: col.color,
  //   bookTitle: col.title,
  // }));

  //(colour) => (colors[colour] = books.filter((book) => book.color == colour))

  // (colors[colour] = books.map((book) => {
  //   if (colour == book.color) {
  //     return book.title;
  //   }
  // }))
  colorsArray.forEach(
    (colour) =>
      (colors[colour] = books.map((book) => {
        if (book.color === colour) {
          return book.title;
        }
      }))
  );

  // console.log("testing object", colors);
  //console.log("alwan", colorsArray);
  return colors;
}
//return authors.map((a) => ({ author: a.name, bookCount: a.books.length }));
//console.log("books filter", booksFilter);

//console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let booksOfAuthor = books.filter((book) =>
    book.authors.find(
      (author) => author.name.toLowerCase() === authorName.toLowerCase()
    )
  );
  //console.log(`books of author ${authorName}`, booksOfAuthor);
  let booksTitles = booksOfAuthor.map((book) => book.title);
  // console.log("titles of books", booksTitles);
  return booksTitles;
}
//console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let BooksAmountArray = authors.map((author) => author.books.length); // Array of the number of books of all authors
  //console.log(mostBooks);
  let maxBooks = Math.max(...BooksAmountArray); // get the max value of books
  // console.log(maxBooks);
  let indexofmax = BooksAmountArray.indexOf(maxBooks); // search for the index of the max value
  // console.log(indexofmax);
  let nameOfMAX = authors[indexofmax].name; // find the name of the author using the index found
  //console.log(nameOfMAX);
  return nameOfMAX;
}
//console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let AuthorOftheBookInfo = books.find((book) => book.id === bookId);
  let AuthorOftheBookNames = AuthorOftheBookInfo.authors.map(
    (author) => author.name
  );
  //console.log("names", AuthorOftheBookNames);
  let listOfBooks = AuthorOftheBookNames.map((author) =>
    titlesByAuthorName(author, authors, books)
  );
  // console.log("list of books", listOfBooks);
  let StringOfBooks = listOfBooks.join();
  // console.log(StringOfBooks);
  let ArrayOfTitles = StringOfBooks.split(",");
  // console.log(ArrayOfTitles);

  //bonus part  -- but i commented it because when i do the npm test it expects the array with duplicates
  /*
  let SetofTitles = [...new Set(ArrayOfTitles)]; //to remove duplicates convert to set

  let finalArray = Array.from(SetofTitles);
  // console.log("no duplicate", finalArray);
  // return finalArray;
  */
  return ArrayOfTitles;
}
//console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  // let allBookID = authors.map((author) => author.books);
  // //console.log(allBookID);
  // let StringOfBooks = allBookID.join();
  // // console.log(StringOfBooks);
  // let ArrayOfBookIDs = StringOfBooks.split(",");
  // console.log(ArrayOfBookIDs);
  // let setArraybookids = new Set(ArrayOfBookIDs);
  // let duplicates = ArrayOfBookIDs.filter((id) => {
  //   if (setArraybookids.has(id)) {
  //     setArraybookids.delete(id);
  //   } else {
  //     return id;
  //   }
  // });
  // // console.log("dupliactes", duplicates);
  // let authorsNames = authors.map((author) =>
  //   author.books.map((book) => book === duplicates.filter((id) => id === book))
  // );
  // console.log("author names updated", authorsNames);
}
console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
