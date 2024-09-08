import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from './assets/component/Input';
import Invoice from './assets/component/Invoice';

function App() {
  const [formData, setFormData] = useState(null);

  // This function will receive the data from the Input component
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Router>
      <Routes>
        {/* Route for Input form */}
        <Route path='/' element={<Input onSubmit={handleFormSubmit} />} />
        
        {/* Route for Invoice page */}
        <Route path='/pdf/:id' element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;
