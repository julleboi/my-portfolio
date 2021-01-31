import React, { useState, useEffect } from 'react';
import './styles.scss';

type Repository = {
  name: string;
  html_url: string;
  description: string;
  updated_at: string;
  created_at: string;
  language: string;
  stargazers_count: number;
}

export default () => { 
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.github.com/users/julleboi/repos')
      .then(res => res.json())
      .then(res => setRepos(res))
      .catch(() => setError('Could not fetch my projects from GitHub :('))
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
        <div id='projects-container'>
          {
            repos.map((repo, idx) => 
              <div className='card projects-container-item' key={idx}>
                <div className='card-body py-2'>
                  <h5 className='card-title'>{repo.name}</h5>
                  <h6 className='card-subtitle text-muted'>{repo.description}</h6>
                </div>
                <div className='card-footer py-2'>
                  <div>{repo.language}</div>
                  <a href={repo.html_url}>GitHub link</a>
                </div>
              </div>
            )
          }
        </div>
      );
    }
  }

  return (
    <div id='projects'>
      <Inner />
    </div>
  );
}