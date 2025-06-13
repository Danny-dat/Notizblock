let buttonText;
let inputNewNote;
let noteFolderRef;
let trashFolderRef;
let notepadContainerRef;
let noteFolder = [];
let trashFolder = [];
let folderSelected;


function init() {
    loadLocalStorage();
    buttonText =  document.getElementById('btn-text');
    inputNewNote = document.getElementById('input-new-note');
    noteFolderRef = document.getElementById('note-folder');
    trashFolderRef = document.getElementById('trash-folder');
    notepadContainerRef = document.getElementById('notepad-container');
    folderSelected = noteFolder;
    renderNotes();

    // HINZUGEFÜGTER CODE START
    // Prüft, ob ein Theme im LocalStorage gespeichert ist und wendet es an
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Event-Listener für den neuen Theme-Button
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        // Speichert die aktuelle Theme-Einstellung
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    // HINZUGEFÜGTER CODE ENDE
}

function renderNotes() {
    let noteAmount = document.getElementById('display-note-amount');
    let trashAmount = document.getElementById('display-trash-amount');
    noteFolderRef.innerHTML = "";
    trashFolderRef.innerHTML = "";
    for (let index = 0; index < noteFolder.length; index++) {
        let note = noteFolder[index];
        noteFolderRef.innerHTML += getNoteTemplate(note.title, index)
    }
    for (let index = 0; index < trashFolder.length; index++) {
        let note = trashFolder[index];
        trashFolderRef.innerHTML += getTrashTemplate(note.title, index)
    }
    noteAmount.innerText = noteFolder.length;
    trashAmount.innerText = trashFolder.length;
}

function openNoteFolder() {
    noteFolderRef.style.overflowY = 'auto';
    trashFolderRef.style.overflowY = 'hidden';
    noteFolderRef.style.flex = '1';
    trashFolderRef.style.flex = '0';
    notepadContainerRef.innerHTML = "";
    folderSelected = noteFolder;
}

function openTrashFolder() {
    noteFolderRef.style.overflowY = 'hidden';
    trashFolderRef.style.overflowY = 'auto';
    noteFolderRef.style.flex = '0';
    trashFolderRef.style.flex = '1';
    notepadContainerRef.innerHTML = "";
    folderSelected = trashFolder;
}

function toggleNewNoteBtn() {
    buttonText.classList.toggle('d-none');
    inputNewNote.classList.toggle('d-none');
    if (inputNewNote.classList == 'd-none') {
        document.getElementById('btn-new-note').disabled = false;
    } else {
        document.getElementById('btn-new-note').disabled = true;
        inputNewNote.focus();
    }
}

function addNote(event) {    
    if (event.key === 'Enter') {
        let noteData = {
            title: inputNewNote.value,
            text: ""
        }

        noteFolder.push(noteData);

        inputNewNote.value = "";
        
        saveLocalStorage();
        renderNotes();
        openNoteFolder();
        openNoteEditor(noteFolder.length-1);
    }
}

function openNoteEditor(index) {
    notepadContainerRef.innerHTML = getNotepadTemplate(index);
    let notepadTextfield = document.getElementById('notepad-textfield');

    document.getElementById('notepad-title').innerText = folderSelected[index].title;
    notepadTextfield.innerText = folderSelected[index].text;

    if (folderSelected[index].text == "") {
        notepadTextfield.focus();
        return;
    }
    
    notepadTextfield.innerText = folderSelected[index].text;
}

function saveNotepad(index) {
    let notepadTextfield = document.getElementById('notepad-textfield');
    folderSelected[index].text = notepadTextfield.innerText;
    saveLocalStorage();
}

function moveNote(from, where, index, event) {
    event.stopPropagation();

    where.push(from[index]);
    from.splice(index, 1);
    notepadContainerRef.innerHTML = "";
    saveLocalStorage();
    renderNotes();
}

function deleteNote(index, event) {
    event.stopPropagation();

    trashFolder.splice(index, 1);
    notepadContainerRef.innerHTML = "";
    saveLocalStorage();
    renderNotes();
}

function saveLocalStorage() {
    localStorage.setItem("notesFolder", JSON.stringify(noteFolder));
    localStorage.setItem("trashFolder", JSON.stringify(trashFolder));
}

function loadLocalStorage() {
    if (localStorage.getItem("notesFolder") === null || localStorage.getItem("trashFolder") === null) {
        return
    } else {
        noteFolder = JSON.parse(localStorage.getItem("notesFolder"));
        trashFolder = JSON.parse(localStorage.getItem("trashFolder"));
    }
}