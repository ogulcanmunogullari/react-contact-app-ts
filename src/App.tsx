import Contacts from "./features/Contacts/Contacts"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditContact from "./features/Contacts/EditContact"

function App() {
  return (
    <div className="container mx-auto px-1 sm:px-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
