import { Idea } from "./App";

interface KnockedOutListProps {
    ideas: Idea[];
    onMoveToIdeas: (idea: Idea) => void
  }

export const KnockedOutList = (props: KnockedOutListProps) => {
    return (
      <div className="knocked-out-list">
        <h2>Knocked Out</h2>
        {props.ideas.map((idea) => (
          <div key={idea.name} className="knocked-out-idea">
            <p>{idea.name}</p>
            <button onClick={ () => props.onMoveToIdeas(idea)}>Move to Ideas</button>
          </div>
        ))}
      </div>
    );
  };