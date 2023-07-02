import { Idea } from "./App";

interface ShortListProps {
    ideas: Idea[];
    onRemove: (idea: Idea) => void;
    onKnockOut: (idea: Idea) => void;
  }

export const ShortList = (props: ShortListProps) => {

    const handleRemove = (idea: Idea) => {
      props.onRemove(idea);
    };
  
    const handleKnockOut = (idea: Idea) => {
      props.onKnockOut(idea);
    };
  
    return (
      <div className="shortlist">
        <h3>SHORTLIST</h3>
        {props.ideas.map((idea) => (
          <div key={idea.name} className="shortlisted-idea">
            <button onClick={() => handleKnockOut(idea)}>KNOCK OUT</button>
            <h3 className={props.ideas.length === 1 ? "glowing-heading" : "normal-heading"}>{idea.name}</h3>
          </div>
        ))}
      </div>
    );
  };