const saveButton = document.getElementById("savebtn");
const title = document.getElementById("title");
const color = document.getElementById("color");
const pin = document.getElementById("pin");
const content = document.getElementById("content");
const deletebtncontainer = document.querySelector("#deletebtn");
const newnotecontainer = document.querySelector(".new-note");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
drawNotes();
color.value = "#ffffff";

// создает обьект note, добавляет к нему кнопку удаления, пушит в массив
// сохраняет в localstorage
function CreateNote() {
  let noteDiv = document.createElement("div");

  let note = {
    title: title.value,
    content: content.value,
    color: color.value,
    pin: pin.checked,
    createdAt: new Date().toLocaleString(),
  };
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  // noteDiv.appendChild(note); appendChild - только дом элементы

  noteDiv.appendChild(deleteButton);

  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));

  drawNotes();
  // clear form
  title.value = "";
  content.value = "";
  color.value = "#ffffff";
  pin.checked = false;
}

saveButton.addEventListener("click", CreateNote);

// рендер заметок
function drawNotes() {
  newnotecontainer.innerHTML = ""; // чтобы заметки не накапливались повторно

  // pin
  let pinnednotes = notes.filter(n => n.pin);
  let unpinnednotes = notes.filter(n => !n.pin);
  let sortednotes = [...pinnednotes, ...unpinnednotes];

  for (let note of sortednotes) {
    let noteDiv = document.createElement("div");

    const notetitle = document.createElement("h2");
    notetitle.textContent = note.title;
    noteDiv.appendChild(notetitle);

    const notepin = document.createElement("div");
    if (note.pin) {
      notepin.textContent = "📌";
    } else {
      notepin.textContent = "";
    }
    noteDiv.appendChild(notepin);
    
    const notecontent = document.createElement("p");
    notecontent.textContent = note.content;
    noteDiv.appendChild(notecontent);

    noteDiv.style.background = note.color;


    const notedate = document.createElement("p");
    notedate.textContent = note.createdAt;
    noteDiv.appendChild(notedate);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
      //  удалить из массива notes
      // notes.filter создает новый массив оставляя в нем только те элементы
      // что проходят условия
      // createdAt единственное уникальное поле
      notes = notes.filter((n) => n.createdAt !== note.createdAt);
      //  удалить с localStorage
      // JSON.stringify(notes) превращает массив в строку потому что
      // localStorage хранит только строки
      // localStorage удаляет старую память и перезаписывает новый массив
      localStorage.setItem("notes", JSON.stringify(notes));
      //  перерисовать
      drawNotes();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => 
    {
      // заменить title и content на input/textarea
      const titleInput = document.createElement("input");
      titleInput.value = note.title;

      const contentInput = document.createElement("textarea");
      contentInput.value = note.content;

      const editSaveButton = document.createElement("button");
      editSaveButton.textContent = "✔️";
      editSaveButton.addEventListener("click", () =>
        {
          note.title = titleInput.value;
          note.content = contentInput.value;
          localStorage.setItem("notes", JSON.stringify(notes));
          drawNotes();
          
      });

      const editDeclineButton = document.createElement("button");
      editDeclineButton.textContent = "✖️";
      editDeclineButton.addEventListener("click", () => 
      {
        drawNotes();
      });

      noteDiv.innerHTML = "";
      noteDiv.appendChild(titleInput);
      noteDiv.appendChild(contentInput);
      noteDiv.appendChild(editSaveButton);
      noteDiv.appendChild(editDeclineButton);
    });

    noteDiv.appendChild(editButton);
    noteDiv.appendChild(deleteButton);

    newnotecontainer.appendChild(noteDiv);
  }
}
