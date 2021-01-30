import React, { useState, useEffect } from 'react';

export default () => { 
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('/projects')
      .then(res => res.json())
      .then(res => res.map((x: any) => x.name))
      .then(res => setNames(res))
      .catch(err => setError('Could not fetch projects'))
      .finally(() => setIsLoading(false));
  }, []);

  const Inner = () => {
    if (error) {
      return (
        <React.Fragment>
          {error}
        </React.Fragment>
      );
    } else if (isLoading) {
      return (
        <React.Fragment>
          Loading...
        </React.Fragment>      
      );
    } else {
      return (
        <ul>
          {names.map(name => <li>{name}</li>)}
        </ul>
      );
    }
  }

  return (
    <div id='projects'>
      <Inner />
    </div>
  );
}