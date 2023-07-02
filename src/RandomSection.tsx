interface RandomSectionProps {
    randomFunction: (number: number) => void
  }

export const RandomSection = (props: RandomSectionProps) => {

    return (
      <div id="random-section">
        <h3>RANDOM:</h3>
        <button className="random-button" onClick={() => props.randomFunction(1)}>1</button>
        <button className="random-button" onClick={() => props.randomFunction(3)}>3</button>
        <button className="random-button" onClick={() => props.randomFunction(5)}>5</button>
      </div>
    )
  }