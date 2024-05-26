import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";

export const FavoriteCards = () => {
  const { cards, loading, error } = useCards();
  const [clickedStates, setClickedStates] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize clicked states from local storage or set all to false if none exist
    const savedClickedStates = JSON.parse(localStorage.getItem("clickedStates") || "[]");
    if (savedClickedStates.length) {
      setClickedStates(savedClickedStates);
    } else {
      setClickedStates(new Array(cards.length).fill(false));
    }
  }, [cards.length]); // Depend on cards.length so that the state initializes correctly when cards load

  const toggleClickedState = (index: number) => {
    const newState = [...clickedStates];
    newState[index] = !newState[index];
    setClickedStates(newState);
    localStorage.setItem("clickedStates", JSON.stringify(newState));
  };

  return (
    <div className="cards-container flex flex-wrap justify-center items-center">
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {cards.map((c, index) => (
        clickedStates[index] && ( // Render only if clickedStates at index is true
          <Link
            to={`/cards/${c._id}`}
            key={c._id}
            className="shadow-2xl p-5 w-1/3 mx-auto rounded-md my-2 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-xl">{c.title}</h2>
            <hr />
            <p>{c.subtitle}</p>
            <button onClick={() => toggleClickedState(index)}>click</button>
            <Link to={`/update/${c._id}`}>UPDATE</Link>
            <img className="img-home" src={c.image.url} alt={c.image.alt} />
          </Link>
        )
      ))}
    </div>
  );
};
export default FavoriteCards;