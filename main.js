// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book) {
        let bookItem = document.createElement('div');
        bookItem.classList.add('grid')
        bookItem.classList.add('book-item')
        bookItem.innerHTML = `
        
               <span>${book.title}</span>
               <span>${book.author}</span>
               <span>${book.isbn}</span>
               <span class="delete">X</span>
         
           `;
        const list = document.querySelector('.books-container');
        list.appendChild(bookItem);
    }
    static clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            UI.showAlert('Book removed Successfully', 'green');
        }
    }
    static showAlert(text, classname) {
        let div = document.createElement('div');
        div.className = `alert ${classname}-alert`;
        div.appendChild(document.createTextNode(text));

        const container = document.querySelector('.container');
        const form = document.querySelector('form');

        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    static changeTheme(item) {
        if (item.getAttribute('id') === "black") {
            document.body.style.background = "#111";
            document.body.style.color = "#fff"
            item.style.border = "2px solid #fff"
        } else {
            document.body.style.background = "#fff";
            document.body.style.color = "#fff"
            document.body.style.color = "#333"
        }
    }
}

//Store Class
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
        console.log(isbn);

        let books = Store.getBooks();

        books = books.filter(book => {
            return book.isbn !== isbn;
        })

        localStorage.setItem('books', JSON.stringify(books));

    }
}

//Event :Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event :Add a book
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;

    //Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('There is a missing field', 'red');
    } else {
        UI.showAlert('Book added successfully', 'green')

        const book = new Book(title, author, isbn);
        UI.addBookToList(book);

        Store.addBook(book);


        UI.clearFields();
    }




});

//Event :Remove a book

document.querySelector('.books-container').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    Store.removeBook(e.target.previousElementSibling.innerText);

});


document.querySelectorAll('.color-item').forEach(item => {
    item.addEventListener('click', () => {
        UI.changeTheme(item)
    })

})