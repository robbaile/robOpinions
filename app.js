var db = new PouchDB('rob_database');

console.log(db);

  db.get('messages').then(function(doc) {
        renderMessages(doc);
    }).catch(function(e) {
        console.log(e)
        if (e.message == 'missing') {
            // we do everything here
            db.put({
                "_id": "messages",
                "messages": [
                "I'm a hard coded message in the array",
                "I'm another hard coded message in the array",
                "I'm the last message and I'm rather long to make sure that we style the page correctly so that it looks good with long and short messages"
                ]
            }).then(function(response) {
                db.get('messages').then(function(doc) {
                    renderMessages(doc)
                })
            })
        }
    })

  function renderMessages(doc) {
      console.log('rendering messages with doc:')
      console.log(doc);
      const formattedMessages = doc.messages.map(message => `<p class="message-p">${message}</p>`).join('');
      const messageContainer = document.querySelector('.messages-container');
      messageContainer.innerHTML = formattedMessages;
  }


let form = document.querySelector('.message-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let textInput = document.querySelector('.text-input');
    let message = textInput.value;
    textInput.value = ""
    

    db.get('messages').then(function(doc) {
        doc.messages.push(message);
        renderMessages(doc);
        return db.put(doc);
    }).catch(function(err) {
        console.log(err);
    })
})

db.replicate.to('https://db-server.robbaile.me');