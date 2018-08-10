const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    let text = {
        USERNAME : username,
        MESSAGE : message
    }
    database.push(text)
}

// Set database "child_added" event listener here
database.on("child_added", function(rowData) {
    let displayText = document.getElementsByClassName("allMessages")[0];
    const row = rowData.val();
    const name = row.USERNAME;
    const message = row.MESSAGE;
    let p = document.createElement("p");
    p.innerText = `${name} : ${message}`
    displayText.appendChild(p);
});