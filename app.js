function Book(title, author, isbn) {
    this.title =title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {
    
}

UI.prototype.addBookToList = function(book) {
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
UI.prototype.clearBookTitle = function() {
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = ''
}

UI.prototype.deleteItem = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.showAlert = (message,className)=>{
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
            ui.addBookToList(book);
            ui.showAlert('Book Added', 'success')
            ui.clearBookTitle();

        }
  
})

document.getElementById('book-list').addEventListener('click',(e)=>{
    const ui = new UI();

    ui.deleteItem(e.target)
    ui.showAlert('Book was deleted sucessfully', 'success')
})