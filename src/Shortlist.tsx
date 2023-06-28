import { Idea } from "./App";

interface ShortListProps {
    ideas: Idea[];
    onRemove: (idea: Idea) => void;
    onKnockOut: (idea: Idea) => void;
  }

export const ShortList: React.FC<ShortListProps> = ({ ideas, onRemove, onKnockOut }) => {
    const handleRemove = (idea: Idea) => {
      onRemove(idea);
    };
  
    const handleKnockOut = (idea: Idea) => {
      onKnockOut(idea);
    };
  
    return (
      <div className="shortlist">
        <h2>Shortlist</h2>
        {ideas.map((idea) => (
          <div key={idea.name} className="shortlisted-idea">
            <h3>{idea.name}</h3>
            <button onClick={() => handleKnockOut(idea)}>Knock Out</button>
            <button onClick={() => handleRemove(idea)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };