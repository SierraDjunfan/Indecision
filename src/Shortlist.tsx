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
        <h3>SHORTLIST</h3>
        {ideas.map((idea) => (
          <div key={idea.name} className="shortlisted-idea">
            <button onClick={() => handleKnockOut(idea)}>KNOCK OUT</button>
            <h3>{idea.name}</h3>
          </div>
        ))}
      </div>
    );
  };