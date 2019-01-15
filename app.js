var db = new PouchDB('rob_database');

console.log(db);



  db.get('messages').then(function (doc) {
    console.log(doc);
  });


let form = document.querySelector('.message-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let textInput = document.querySelector('.text-input');
    let message = textInput.value;
    textInput.value = ""
    

    db.get('messages').then((doc) => {
        doc.messages.push(message);
        return db.put(doc);
    }).catch(err => {
        console.log(err);
    })
})