
import React, { useState, useEffect } from 'react';

export default () => { 
  const [error, setError] = useState<string>();
  const [ready, setReady] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/dev/projects')
      .then(res => res.json())
      .then(res => {
        setReady(true);
        setNames(res.map((x: any) => x.name))
      }, err => {
        setReady(true);
        setError(err);
      });
  }, []);

  return (
    <div id='projects'>
      {
        error 
          ? `Error: ${error}` 
          : ready 
            ? (
              <ul>
                {names.map(n => <li>{n}</li>)}
              </ul>
            ) : 'Loading...'
      }
    </div>
  );
}