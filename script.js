const fetchButton = document.getElementById("add-btn");
const queryInput = document.getElementById("note-text");
const nutritionTable = document.getElementById("nutritionTable");

fetchButton.addEventListener("click", async () => {
    const query = queryInput.value;
    
    if (query) {
        const response = await fetchNutritionData(query);
        displayNutrition(response);
    }
});

async function fetchNutritionData(query) {
    const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const timezone = "US/Eastern";

    const response = await fetch(url, { 
        method: "POST",
        headers: {
            "x-app-id": "b4cb39e4",
            "x-app-key": "1656db884715f400547a9ed900ad0132",
            "x-remote-user-id": "0",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, timezone }),
    });

    return await response.json();
}

function displayNutrition(data) {
    nutritionTable.innerHTML = ""; // Clear previous data

    const table = document.createElement("table");
    const headerRow = table.insertRow(0);
    headerRow.innerHTML = `
        <th>Image</th>
        <th>Qty</th>
        <th>Unit</th>
        <th>Food</th>
        <th>Calories</th>
        <th>Weight</th>
        <th>Food Group</th>
    `;

    const foods = data.foods;

    if (foods && foods.length > 0) {
        for (let i = 0; i < foods.length; i++) {
            const food = foods[i];
            const row = table.insertRow(i + 1);
            row.innerHTML = `
                <td><img src="${food.photo.thumb}"></td>
                <td>${food.serving_qty}</td>
                <td>${food.serving_unit}</td>
                <td>${food.food_name}</td>
                <td>${food.nf_calories}</td>
                <td>${food.serving_weight_grams}g</td>
                <td>${food.tags.food_group}</td>
            `;
        }
    } else {
        const row = table.insertRow(1);
        const cell = row.insertCell(0);
        cell.colSpan = 7;
        cell.textContent = "No data found for the provided query.";
    }

    nutritionTable.innerHTML = "";
    nutritionTable.appendChild(table);
    nutritionTable.classList.remove("hidden");
}

let addBtn = document.getElementById("add-btn"),
  addTitle = document.getElementById("note-title"),
  addTxt = document.getElementById("note-text"),
  clear = document.querySelector(".clear");

function getNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (addTitle.value == "" || addTxt.value == "") {
    return alert("Please add note title and details");
  }
  getNotes();

  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  document.querySelector("form").reset();
  //   console.log(notesObj);
  showNotes();
});

function selectDay(day) {
  const selectedDayDiv = document.getElementById("selected-day");
  selectedDayDiv.textContent = `You selected ${day}.`;
//Selected day 2
  const selectedDayDiv2 = document.getElementById("note-title2");
  selectedDayDiv2.textContent = `${day}.`;
}


function showNotes() {
  getNotes();
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="note">
            <p class="note-counter">Meal ${index + 1}</p>
            <h3 class="note-title">${element.title}</h3>
            <p class="note-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
            </div>
        </div>
        `;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "No Notes yet. Please add a note.";
  }
}

function deleteNote(index) {
  let confirmDel = confirm("Delete this note?");
  if (confirmDel == true) {
    getNotes();
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

function editNote(index) {
  if (addTitle.value !== "" || addTxt.value !== "") {
    return alert("Please clear the form before editting a note.");
  }
  getNotes();
  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  });
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Delete all notes
clear.addEventListener("click", () => {
  localStorage.clear();
  showNotes();
});

showNotes();
