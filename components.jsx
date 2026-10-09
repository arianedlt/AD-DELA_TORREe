import React, { useState, useEffect } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  let unusedVariable = "This variable is never used";

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  function handleClick() {
    setCount(count + 1);
  }

  const items = ['apple', 'banana', 'cherry'];
  const list = items.map((item) => <li>{item}</li>);

  return (
    <div className="p-4">
      <h1>Hello from ESLintTrigger!</h1>
      <img src="/example.jpg" />
      <button onClick={handleClick}>Increment</button>
      <p>Count: {count}</p>
      <ul>{list}</ul>
      <span>
        {count > 5 ? count > 10 ? 'Too high' : 'High' : 'Normal'}
      </span>
    </div>
  );
}