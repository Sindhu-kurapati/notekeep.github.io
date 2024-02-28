let notesListRootElement = document.querySelector('.notesList');
let notes = [];

function renderElementsToScreen(){

  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'))
    notes.forEach(note=>{
      renderNoteToList(note, note.uniqueID);
    })
  }
}

document.querySelector('#deleteAllNotes').addEventListener('click', ()=>{
  document.querySelectorAll('.note').forEach(note=>{
    note.remove();
  })
  localStorage.clear();
})


document.querySelector('#createNoteButton').addEventListener('click', ()=>{
  let uniqueID = 'note' + Math.floor(Math.random() * 1000)
   let note = {
     title : document.querySelector('#createNoteTitle').value,
     content : document.querySelector('#createNoteContent').value
   }
   addNoteToLocalStorage(note, uniqueID)
   renderNoteToList(note, uniqueID)
})

  
 function renderNoteToList(note, uniqueID){
  if(note.title === '' || note.content === ''){
    alert("Please enter the required fields in create note");
  }
  else{


   let noteDiv = document.createElement('div');
   noteDiv.classList.add('note', uniqueID);

   let noteTitle = document.createElement('h4');
   let noteContent = document.createElement('p');
   let noteDeleteButton = document.createElement('button');

  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteDeleteButton.innerText = 'Delete Note';

  noteDeleteButton.addEventListener('click', ()=>{
     removeElementFromNotesList(uniqueID)
  })

    noteDiv.appendChild(noteTitle);
    noteDiv.append(noteContent);
    noteDiv.appendChild(noteDeleteButton);
  
  notesListRootElement.appendChild(noteDiv);
 

  document.querySelector('#createNoteTitle').value = '';
   document.querySelector('#createNoteContent').value = '';
   
 }
}

function addNoteToLocalStorage(note, uniqueID){
  note = {...note, uniqueID};

  notes.push(note);

  localStorage.setItem('notes', JSON.stringify(notes))

}

function removeElementFromNotesList(id){
  document.querySelector('.' + id).remove();

  notes = JSON.parse(localStorage.getItem('notes'))

  let index = notes.findIndex(note=>note.uniqueID == id)

  notes.splice(index, 1)

  localStorage.setItem('notes',JSON.stringify(notes));

}
renderElementsToScreen()