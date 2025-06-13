function getNoteTemplate(title, index) {
    return `
    <button class="note" onclick="openNoteEditor(${index})">
        <span id="note-title">${title}</span>
        <div class="icon delete" onclick="moveNote(noteFolder, trashFolder, ${index}, event)"></div>
    </button>`
}

function getTrashTemplate(title, index) {
    return `
    <button class="note" onclick="openNoteEditor(${index})">
        <span id="note-title">${title}</span>
        <div class="icon-container">
            <div class="icon restore" onclick="moveNote(trashFolder, noteFolder, ${index}, event)"></div>
            <div class="icon delete" onclick="deleteNote(${index}, event)"></div>
        </div>
    </button>`
}

function getNotepadTemplate(index) {
    return `
    <div id="notepad-editor">
        <h2 id="notepad-title" contenteditable="false"></h2>
        <p id="notepad-textfield" contenteditable="true" oninput="saveNotepad(${index})"></p>
    </div>`
}








