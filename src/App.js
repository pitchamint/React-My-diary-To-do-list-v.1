import { useState } from 'react';
import './App.css';

const startNote = {
  content: '', author: ''
}

function App() {
  //states
  //ใช้จัดการฟอร์มของเรา 
  const [note, setNote] = useState(startNote);
  //ใช้ในการแก้ไขข้อมูลภายใน Array
  const [editNote, setEditNote] = useState(null)
  //ใช้จัดการ บันทึกข้อความที่เราพิมพ์เป็นอาร์เรย์ทั้งหมด
  const [allNotes, setAllNotes] = useState([]);

  //function form input
  function onNoteValueChange(event){
    const { name, value } = event.target;
    setNote((prevNote) => {
        return{
          ...prevNote, 
          [name]: value
        }
    })
  }
  //function add edit dalete
  function onEditNoteValueChange(event){
    const { name, value } = event.target;
    setEditNote((prevNote) => {
        return{
          ...prevNote, 
          [name]: value
        }
    })
  }

  //function
  //การเพิ่ม note
  function onNoteSubmit(event){
    event.preventDefault(); //ป้องกันการรีเฟรชหน้าเว็บเพจ

    setAllNotes((prevAllNotes) => {
      //ตั้งค่าไอดีให้กับ note แต่ละตัว โดยที่ค่าไม่ซ้ำกัน
        const newNote ={...note}
        newNote.id = Date.now().toString();
        return[newNote, ...prevAllNotes] //การเพิ่มสมาชิกในอาร์เรย์ให้ออกมาเป็นอาร์เรย์ใหม่ คือ note 
        //การพิมพ์ note ไว้ด้านหน้า คือบันทึกอันใหม่จะอยู่บนสุด
    })
    //เวลาจะพิมพ์บันทึกอันใหม่ เราจะ set Note ให้กลับมาค่าเริ่มต้น
    setNote(startNote);
  }

  //การแก้ไข Note
  function onEditNoteSubmit(event){
    event.preventDefault();

    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if(theNote.id !== editNote.id) return theNote; //ถ้าไม่มีการแก้ไขก็ return ตัวเดิมออกไป
        return editNote; //แต่ถ้ามีต้อง return ค่าที่ edit
      });
    });
    setEditNote(null); 
  }

  //การลบ Note
  function onNoteDelete(noteId){
    setAllNotes((prevAllNotes)=>{ 
      //ทำการกรอง theNote ที่มีค่าตรงกับ noteId ให้มันลบออกไป 
      return prevAllNotes.filter(theNote => theNote.id !== noteId); 
      //ความหมายของ return นี้คือ ให้ return ค่าอาร์เรย์ใหม่ ที่ไม่ตรงกับ noteID อันไหนตรงก็เอาออกไป
    });
  }

  //elements
  const noteElements = allNotes.map((theNote) => { 
  //เปลี่ยนจากข้อมูลดิบให้กลายเป็น ui โดยใช้การ map เข้าถึง theNotes(note แต่ละตัว)
    return (
      <div key={theNote.id} className='app-note'>
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() => {setEditNote(theNote)}}>Edit</a>
          <span> | </span>
          <a onClick={() => {onNoteDelete(theNote.id)}}>Delete</a>
        </p>
      </div>
    )
  });

  let editNoteElement = null; //ขึ้นค่าว่างไปก่อน
  if(!!editNote){
    editNoteElement = (
    <div className='app-edit-note'>
      <form onSubmit={onEditNoteSubmit}>
          <p>
            <textarea
              rows = "3"
              placeholder='Write from your heart'
              name='content'
              value={editNote.content}
              onChange = {onEditNoteValueChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder='your name'
              name='author'
              value={editNote.author}
              onChange = {onEditNoteValueChange}
            />
          </p>
          <p>
            <button type='submit'>Add Note</button>
          </p>
        </form>
    </div>)
  }

  return(
    <section className='app-section'>
      <div className='app-container'>
        <h3>My Diary</h3>
        <form onSubmit = {onNoteSubmit}>
          <p>
            <textarea
              rows = "3"
              placeholder='Write from your heart'
              name='content'
              value={note.content}
              onChange={onNoteValueChange}
            />
          </p>

          <p>
            <input
              type="text"
              placeholder='your name'
              name='author'
              value={note.author}
              onChange={onNoteValueChange}
            />
          </p>
          <p>
            <button type='submit'>Add Note</button>
          </p>
        </form>
        <div className='app-notes'>
            {noteElements}
        </div>
      </div>
      {editNoteElement}
    </section>
    );
  }

  export default App;