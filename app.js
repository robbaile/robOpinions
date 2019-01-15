var db = new PouchDB('rob_database');

console.log(db);

var doc = {
    "_id": "messages",
    "messages": [
      "I'm a hard coded message in the array",
      "I'm another hard coded message in the array",
      "I'm the last message and I'm rather long to make sure that we style the page correctly so that it looks good with long and short messages"
    ]
};


  db.get('messages').then((doc) => {
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