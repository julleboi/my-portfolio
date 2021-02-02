import React, { useState, useEffect } from 'react';
import LanguageBadge from './LanguageBadge';
import StarsBadge from './StarsBadge';
import './styles.scss';

type Repository = {
  name: string;
  html_url: string;
  description: string;
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
              <div className='projects-item' key={idx}>
                <div className='projects-item-body'>
                  <div className='projects-item-title'>{repo.name}</div>
                  <div className='projects-item-text'>
                    {repo.description}
                  </div>
                </div>
                <div className='projects-item-footer'>
                  <a href={repo.html_url}>GitHub</a>
                  <div className='projects-item-badges'>
                    <StarsBadge count={repo.stargazers_count} />
                    <LanguageBadge type={repo.language} />
                  </div>
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