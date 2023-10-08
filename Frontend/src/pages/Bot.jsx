import React from 'react';
import Chatbot from '../components/chatbot';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
