let library = [];
// update data function

const update_data=()=>{
    localStorage.setItem("lib",JSON.stringify(library));
}

// get data function
window.addEventListener('load', ()=>{
    console.log("Data");
    library= JSON.parse(localStorage.getItem("lib"))??[];
    console.log(library)

})




function createbook(id, title, author) {
    this.id = id,
        this.author = author,
        this.isBorrowed = false,
        this.title = title
}
// check if the book with is is present or not 
const isPresent = (id) => {
    for (let i = 0; i < library.length; i++) {
        if (library[i].id === id) {
            return i;
        }
    }
    return -1;
}

const addBook = (id, title, author) => {
    if (isPresent(id) != -1) {
        console.log(`Book with id ${id} is already present`);
        return false;
    }
    const newbook = new createbook(id, title, author);
    library.push(newbook);
    console.log(`Book with id ${id} is added to library `);
    return true
}

// borrow function 
const borrowingBooks = (id) => {
    let index_no = isPresent(id);
    if (index_no != -1) {
        if (library[index_no]["isBorrowed"] === true) {
            console.log(`Book is present but book  is not currently available `);
            return false
        }
        else {
            library[index_no].isBorrowed = true;
            console.log(`Book is present and you Borrowed that book  `);
            update_data()
            return true;
        }
    } else {
        console.log(` You can't borrow book with id ${id}  because is not present `);
        return false;
    }
}

// Returning Books
const returningBooks = (id) => {
    let index_no = isPresent(id);
    if (index_no != -1 && library[index_no].isBorrowed == true) {
        library[index_no].isBorrowed = false;
        update_data()
        console.log(`Book with id ${id} is returned successfully`)
        return true;
    } else {
        console.log(`Book not belongs to our Libraray `)
        return false
    }
}

// List Available Books:
const listAvailableBooks = () => {
    console.log("<----List of all available books ---->")
    for (let i = 0; i < library.length; i++) {
        if (library[i].isBorrowed == false) {
            console.log(library[i]);
        }
    }
}

// Search for a Book
const searchForBook = (title) => {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === title) {
            console.log(`Book with title ${title} is  present `)
            return i;

        }
    }
    console.log(`Book with title ${title} is not present `)
    return -1;
}

//print all books in Library

const allBookInLibaray = () => {
    console.log(`<---All books  present in Library are: --->`)
    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
    }
}



// FUNCITON CALL

//  adding books 
// addBook(10,"title1" ,"authoris1");
// addBook(11,"title2" ,"authoris2");
// addBook(101,"title3" ,"authoris3");
// addBook(112,"title4" ,"authoris4");
// addBook(101,"title22" ,"authoris2");


// borrowbooks
// borrowingBooks(11);
// listAvailableBooks()
// // pint all books
// allBookInLibaray()

// // returning books
// returningBooks(11);

// listAvailableBooks()

// searchForBook("title")





// ON CLICK FUNCTION

const rightSideId = document.getElementById('right');

// rightSideId.innerHTML="";


//ON CLICK ADD BOOK
// const btn1 = document.getElementById('btn');
// const addBookId = document.getElementById('addBook');
// const addBookDisplay = addBookId.innerHTML;
// console.log(addBookDisplay)
// addBookId.innerHTML="";

// addBookId.addEventListener("click",(event)=>{
// addBookId.innerHTML=addBookDisplay;
// })







//  ADD BOOK TO LIBRARY 



const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
// const btn4 = document.getElementById('btn4')
const show2_visible = document.getElementById('data-table');
const show1_visible = document.getElementById('show1');
const show3_visible = document.getElementById('show3');

// void make all other hidden 

const make_hidden = (index) => {
    console.log(" value is " + index)
    if (index == 1) {
        show2_visible.style.display = "none";
        show3_visible.style.display = "none";
        btn2.style.color = "black"
        btn3.style.color = "black"

    } else if (index == 2) {
        show1_visible.style.display = "none";
        show3_visible.style.display = "none";
        btn1.style.color = "black"
        btn3.style.color = "black";

    } else if (index == 3) {
        show1_visible.style.display = "none";
        show2_visible.style.display = "none";
        btn1.style.color = "black"
        btn2.style.color = "black";
    } else {

    }

}

btn1.addEventListener('click', (event) => {
    console.log(" first ")
    make_hidden(1);
    if (show1_visible.style.display == "block") {
        btn1.style.color = "black";
        show1_visible.style.display = "none";
    } else {
        btn1.style.color = "red";
        show1_visible.style.display = "block";
    }



})


const bookId = document.getElementById("bookId");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");

const submit_Add_Book = document.getElementById("submit_add_book");
submit_add_book.addEventListener("click", (event) => {
    event.preventDefault();
    let bookidis = bookId.value;
    let booktitleis = bookTitle.value;
    let bookauthoris = bookAuthor.value
    bookidis = bookidis.trim();
    booktitleis = booktitleis.trim();
    bookauthoris = bookauthoris.trim();
    // console.log("valuse is "+bookidis);
    // console.log("valuse is "+booktitleis);
    // console.log("valuse is "+bookauthoris);
    if (bookidis.length == 0 || booktitleis.length == 0 || bookauthoris.length == 0) {
        alert("All fields are necessary ");
    } else if (addBook(bookidis, booktitleis, bookauthoris)) {
        alert('BOOK IS ADDED SUCCESSFULLY ');
    }
    else {
        alert('BOOK WITH SAME ID IS ALREADY PRESENT ');
    }
    bookId.value = "";
    bookTitle.value = "";
    bookAuthor.value = "";
    update_data()
})


const display_Books = (index, id, title, author, status) => {
    let table = document.getElementById("book-data-table");
    let row = document.createElement("tr")

    // Create cells
    let c1 = document.createElement("td")
    let c2 = document.createElement("td")
    let c3 = document.createElement("td")
    let c4 = document.createElement("td")
    let c5 = document.createElement("td")
    let btn = document.createElement("button");
    c5.appendChild(btn);

    c1.style.height = "15px"

    c1.textContent = index;
    c2.textContent = id;
    c3.textContent = title;
    c4.textContent = author;
    btn.dataset['id']=id;


    if(status===false){
        btn.classList.add("status_btn_borrowed");
        console.log("Btn id is "+btn.dataset.id);
        btn.textContent="BORROW"
    }else{
        btn.classList.add("status_btn_return");
        btn.textContent="RETURN"

    }

    // event listener on status btn 


    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        
        if(btn.classList.contains("status_btn_borrowed")){
            btn.classList.remove("status_btn_borrowed");
console.log("Borrow");
            borrowingBooks(btn.dataset.id);
            alert(`Borrowed Book with id ${id}`);
            btn.classList.add("status_btn_return")
            display_All_Books()
        }else{

            console.log("Return");
            btn.classList.remove("status_btn_return")
            returningBooks(btn.dataset.id)
            alert(`Return Book with id ${id}`);
            btn.classList.add("status_btn_borrowed")
            display_All_Books()
        }
       
      
                })



    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    table.querySelector('tbody').appendChild(row)


}

// staus button for borrow and return book
// let btn = 
// let check_borrow_return =btn.classList.contains("status_btn_borrowed");
//  if(check_borrow_return){
//     console.log("You can borrow the book")
//  }else{
//     console.log("REturn book")
//  }







const display_All_Books = () => {
    let table = document.getElementById("book-data-table");
    console.log("Length of library is " + library.length);
    table.querySelector('tbody').innerHTML = ""
    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
        display_Books(i + 1, library[i].id, library[i].title, library[i].author, library[i].isBorrowed);
    }
}


let table = document.getElementById("book-data-table");

btn2.addEventListener('click', (event) => {
    make_hidden(2)
    table.querySelector('tbody').innerHTML = ""
    event.preventDefault();
    display_All_Books();



    if (show2_visible.style.display == "block") {
        btn2.style.color = "black";
        show2_visible.style.display = "none";
    } else {
        btn2.style.color = "red";
        show2_visible.style.display = "block";
    }
    update_data()
})



//  search book with help of title 


btn3.addEventListener('click', (event) => {
    make_hidden(3);
    let table = document.getElementById("search_book_table");
   table.querySelector('tbody').innerHTML="";
   table.style.display=""
       console.log("erase ALl data");
table.querySelector('tbody').innerHTML = ""

    if (show3_visible.style.display == "block") {
        btn3.style.color = "black";
        show3_visible.style.display = "none";
    } else {
        btn3.style.color = "red";
        show3_visible.style.display = "block";
    }
})

console.log('Hello')


const search_By_Title = document.getElementById('Search_by_title');
console.log("search"+search_By_Title);

search_By_Title.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(' Search btn press')
    let book_title = document.getElementById('Book_Title').value;
book_title = book_title.trim();
if(book_title.length==0){
    alert(`TITLE FIELD IS REQUIRED`)
    return;
}
let table = document.getElementById("search_book_table");
table.style.display="none"
table.querySelector('tbody').innerHTML=""
let index = searchForBook(book_title);
    if(index===-1){
        console.log('BOOK IS NOT PREESNT');
       
        alert(`BOOK WITH TITLE "${book_title}" IS NOT PRESENT`)

        }else{
        console.log(" BOOk is PRESENT");
for(key in library[index]){
    console.log(`Key is ${key} value is ${library[index][key]}`)
}

 table = document.getElementById("search_book_table");
let row = document.createElement("tr")
    table.style.display="block"
    // Create cells
    let c1 = document.createElement("td")
    let c2 = document.createElement("td")
    let c3 = document.createElement("td")
    let c4 = document.createElement("td")
    let c5 = document.createElement("td")
    let btn = document.createElement("button");
    c5.appendChild(btn);

    c1.style.height = "15px"

    c1.textContent = 1;
    c2.textContent = library[index].id;
    c3.textContent = library[index].title;
    c4.textContent = library[index].author;

    if(library[index].isBorrowed==false){
        c5.textContent="Availiable";
    }else{
        c5.textContent="Not Availiable";
    }

 
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    table.querySelector('tbody').appendChild(row)


        }
})



//  on event listener to display the search book content

