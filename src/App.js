import React from 'react';
import Todo from './components/todo';

function App() {
  return (
    <div
      className="container border border-light rounded mt-5"
      style={{
        background: 'url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1700092800&semt=sph)',
        backgroundSize: 'cover',
      }}
    >
      <Todo/>

    </div>
  );
}

export default App;
