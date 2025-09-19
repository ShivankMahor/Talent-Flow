import './App.css'
import { Routes, Route } from 'react-router-dom';
import ExampleComponent from './test';
function App() {

  return (
    <Routes>
      <Route path='/test' element={<ExampleComponent/>}></Route>
      {/* <Route path='/' element={</>}></Route> */}
    </Routes>
  )
}

export default App
