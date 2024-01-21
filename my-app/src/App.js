import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import { StudentView } from './components/studentView';
import { StudentForm } from './components/StudentForm';
import { StudentDetail } from './components/StudentDetail';
import { TeacherView } from './components/TeacherView';
import { TeacherForm } from './components/TeacherForm';
import { TeacherDetail } from './components/TeacherDetail';
import { SchoolView } from './components/SchoolView';
import { ClassView } from './components/ClassView';

function App() {
  return (
    <div className="App bg-gray-800 min-h-screen">
      <NavBar/>
      <Routes>
        <Route path="/" element={<StudentView/>}/>
        <Route path='/students/:id' element={<StudentDetail/>}/>
        <Route path='/students/add' element={<StudentForm/>}/>
        <Route path='/students/edit/:id' element={<StudentForm/>}/>
        <Route path='/teachers' element={<TeacherView/>}/>
        <Route path='/teachers/:id' element={<TeacherDetail/>}/>
        <Route path='/teachers/add' element={<TeacherForm/>}/>
        <Route path='/teachers/edit/:id' element={<TeacherForm/>}/>
        <Route path='/schools' element={<SchoolView/>}/>
        <Route path='/classes' element={<ClassView/>}/>
      </Routes>
    </div>
  );
}

export default App;
