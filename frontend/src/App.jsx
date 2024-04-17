import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./components/login/Login"
import Upload from "./pages/Uploadfile/Upload"
import ViewPapers from "./pages/ViewPapers/ViewPapers"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Upload />} />
          <Route path='/login' element={<Login />} />
          <Route path='/viewpapers' element={<ViewPapers />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
