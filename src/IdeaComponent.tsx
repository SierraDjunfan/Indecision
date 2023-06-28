import { Idea } from "./App";

interface IdeaProps {
    idea: Idea
    onRemove: (idea: Idea) => void
    onShortlist: (idea: Idea) => void
  }

export const IdeaComponent = (props: IdeaProps) => {

    return (
      <div className="idea">
        <h3>{props.idea.name}</h3>
        <button onClick={() => props.onShortlist(props.idea)}>Move to Shortlist</button>
        <button onClick={() => props.onRemove(props.idea)}>X</button>
      </div>
    );
  };