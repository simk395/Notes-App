const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
   const notes = loadNotes()
   const duplicateNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase())
   if(!duplicateNote){
   notes.push({
       title: title,
       body: body
   })

   saveNotes(notes)
   console.log('New note added!')
    }else{
    console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

const removeNote = title => {
    const notes = loadNotes()
    const filterNotes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase())
    if(filterNotes.length === notes.length){
        console.log(chalk.bgRed("No note found!"))
    }else{
        saveNotes(filterNotes)
        console.log(chalk.bgGreen('Note has been removed!'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow("Your notes:"))
    notes.forEach(note => console.log(chalk.blue(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase())
    findNote ? console.log("title:", chalk.green(findNote.title), "body:", findNote.body) : console.log(chalk.red("No note found!"));
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}