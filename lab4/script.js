let notes = JSON.parse(localStorage.getItem('notes')) || [];

const form = document.getElementById('noteform');
const title = document.getElementById('title');
const content = document.getElementById('content');
const color = document.getElementById('color');
const pinned = document.getElementById('pinned');
const btSubmit = document.getElementById('submit');
const tags = document.getElementById('tags');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const tagsArray = tags.value.split(',').map(tag => tag.trim().replace('#', '').toLowerCase())
    const note = {
        id: Date.now().toString(),
        title: title.value.trim(),
        content: content.value.trim(),
        color: color.value,
        tags: tagsArray,
        pinned: pinned.checked,
        createdAt: new Date().toISOString()
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    console.log('Created note:', note);
});


function renderNotes(){
    const container = document.getElementById('notes-container');
    container.innerHTML='';

    let copyNotes = [...notes];

    copyNotes.sort((a,b) => b.pinned-a.pinned);

    copyNotes.forEach(note => {
        const noteDiv = document.createElement('div');


        noteDiv.style.backgroundColor=note.color;
        noteDiv.style.width= '300px';
        noteDiv.style.border= '1px solid #aaa';
        noteDiv.style.borderRadius= '6px';
        noteDiv.style.margin='10px';
        noteDiv.style.padding='1px';
        noteDiv.style.position = 'relative'; 

        noteDiv.innerHTML = `
        <h3 style="font-size: 22px; 
        font-family: Verdana, Geneva, Tahoma, sans-serif;  
        font-weight: 100;
        text-align: center;">${note.title}</h3>

         <h3 class="tag" style="font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;">
        ${Array.isArray(note.tags) && note.tags.length > 0 ? note.tags.map(tag => `#${tag}`).join(', ') : 'No tags'}
    </h3>  

        <h3 style="font-size: 18px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;  
        font-weight: 100;">${note.content}</h3>
        <small style="font-family: Verdana, Geneva, Tahoma, sans-serif;"
        >Created at: ${new Date(note.createdAt).toLocaleString()}</small><br>
        ${note.pinned ? '<span class="pinned-icon">📌</span>' : ''}
        `;
        container.appendChild(noteDiv);
    })
}

renderNotes();