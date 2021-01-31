import React from 'react';

type ExampleFlavors = 'javascript' | 'typescript' | 'scala' | 'rust';

type LangaugeBadgeProps = {
  type: string | ExampleFlavors;
}

export default (props: LangaugeBadgeProps) => {
  let theme = 'secondary';

  switch (props.type.toLocaleLowerCase()) {
    case 'javascript':
      theme = 'js-yellow';
      break;
    case 'typescript':
      theme = 'ts-blue';
      break;
    case 'scala':
      theme = 'scala-red';
      break;
    case 'rust':
      theme = 'rusty';
      break;
  }

  return (
    <span className={`language-badge bg-${theme}`}>
      {props.type}
    </span>
  );
}