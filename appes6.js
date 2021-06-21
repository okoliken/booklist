class Book{
     constructor(title,author,isbn){
         this.title = title;
         this.author  = author;
         this.isbn = isbn; 
     }
}

class UI{
    
    addBookToList(book){
        const bookList = document.getElementById('book-list');

        const list = document.createElement('tr');
        list.className = 'item'
        list.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `
        // console.log(list)
        bookList.appendChild(list);
    }


    showAlert(message,className){
        const div = document.createElement('div')
        div.className = `alert ${className}`

        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')

        container.insertBefore(div,form)

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },3000)
    }
    
    deleteItem(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
          }
    }
    
    clearBookTitle(){
        document.getElementById('title').value = '',
        document.getElementById('author').value = '',
        document.getElementById('isbn').value = ''
    }
}

class Store{
    static getBooks(){
        let books;

        if (localStorage.getItem('books') === null) {
            books = []
        }else{
            books =  JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new  UI;
            ui.addBookToList(book)
        });
    }
    static addBooks(book){
        const books = Store.getBooks()

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBooks(isbn){
        const books = Store.getBooks()

        books.forEach((book,index) =>{
            if (book.isbn === isbn) {
              books.splice(index,1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

document.addEventListener('DOMContentLoaded',Store.displayBooks)

document.getElementById('book-form').addEventListener('submit',(e)=>{
    // get form values
    e.preventDefault();
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

            const book = new Book(title,author,isbn)

        const ui = new UI();
        if (title === "" || author === "" || isbn === "") {
        ui.showAlert('Please fill all the fields', 'error')
        }else{
            Store.addBooks(book);
            Store.displayBooks(book)
            ui.showAlert('Book Added', 'success')
            ui.clearBookTitle();
            

        }
  
})

document.getElementById('book-list').addEventListener('click',(e)=>{
    const ui = new UI();

    ui.deleteItem(e.target)
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book was deleted sucessfully', 'success')
})