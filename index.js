import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://watc-endorsement-project-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const endorsementInputEl = document.getElementById("endorsement-input-el")
const recipientInputEl = document.getElementById("recipient-input-el")
const senderInputEl = document.getElementById("sender-input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementOutputEl = document.getElementById("endorsement-output-el")

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
    
        clearEndorsementOutputEl()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentItem = endorsementsArray[i]
            let currentItemID = currentItem[0]
            let currentItemArray = currentItem[1]
            
            let currentItemValue = currentItemArray[0]
            let currentItemRecipient = currentItemArray[1]
            let currentItemSender = currentItemArray[2]
            
            addItemToEndorsementOutputEl(currentItemValue, currentItemRecipient, currentItemSender)
        }
    } else {
        endorsementOutputEl.innerHTML = "No endorsements here... yet"
    }
})

function clearInputEls() {
    endorsementInputEl.value = ""
    recipientInputEl.value = ""
    senderInputEl.value = ""
}

function clearEndorsementOutputEl() {
    endorsementOutputEl.innerHTML = ""
}

publishBtn.addEventListener("click", function() {
    let endorsementContent = [
        endorsementInputEl.value,
        recipientInputEl.value,
        senderInputEl.value
    ]
    push(endorsementsInDB, endorsementContent)
    clearInputEls()
})

function addItemToEndorsementOutputEl(endorsement, recipient, sender) {
    let newEl = document.createElement("div")
    
    newEl.innerHTML = `<li>
        <h4>To ${recipient}</h4>
        <p>${endorsement}</p>
        <h4>From ${sender}</h4>
    </li>`
    
    endorsementOutputEl.appendChild(newEl)
}