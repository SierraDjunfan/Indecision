import { useState } from 'react';
import './App.css';
import FilterComponent from './FilterComponent'
import IdeaListComponent from './IdeaListComponent';

interface Idea {
  name: string
}

const dummyAppState = {
  tags: [ {name: "Video Game", isSelected: true}, {name: "Competitive", isSelected: true}, {name: "Movie", isSelected: true}],
  ideas: [{name: "Dota 2"}, {name: "Poo"}, {name: "Wee"}, {name: "Fart"}, {name: "Piss"}, {name: "Eat"}]
}

function App() {

  const [state, setState] = useState(dummyAppState)

  function filterButtonWasPressed() {

  }


  return (
    <div>
      <FilterComponent filterButtonFunction={filterButtonWasPressed} tags={state.tags}></FilterComponent>
      <IdeaListComponent></IdeaListComponent>
    </div>
  );
}

export default App;
