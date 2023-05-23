import './App.css';
import FilterComponent from './FilterComponent'

function App() {


  function filterButtonWasPressed() {

  }


  return (
    <div>
      <FilterComponent filterButtonFunction={filterButtonWasPressed}></FilterComponent>
    </div>
  );
}

export default App;
