import React from 'react';
import './App.css';
import TodoApp from './Components/TodpApp';

function App() {
  const [theme, setTheme] = React.useState('AppLight')
  return (
    <div className={theme + ' app'}>
      <TodoApp />
    </div>
  );
}

export default App;
