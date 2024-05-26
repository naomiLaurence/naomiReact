import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";
import "./Cards.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Cards = () => {
  const { cards, loading, error } = useCards();
  const [clickedStates, setClickedStates] = useState<boolean[]>([]);

  useEffect(() => {
    // Load clicked states from localStorage or initialize as false for each card
    const savedClickedStates = JSON.parse(localStorage.getItem("clickedStates") || "null");
    if (savedClickedStates && savedClickedStates.length === cards.length) {
      setClickedStates(savedClickedStates);
    } else {
      setClickedStates(Array(cards.length).fill(false));
    }
  }, [cards.length]); // Depend on cards.length to ensure correct state initialization

    const toggleClickedState = (index: number) => {
      setClickedStates((prevClickedStates) => {
        const newState = [...prevClickedStates];
        newState[index] = !newState[index];
        localStorage.setItem("clickedStates", JSON.stringify(newState));
        return newState;
      });
    };

    return (
      <div className="cards-container flex flex-wrap justify-center items-center">
        {loading && <Spinners />}
        {error && <div>{error}</div>}

        {cards.map((card, index) => (
          <div key={card._id} className="full-cards shadow-2xl p-5 w-1/3 mx-auto rounded-md my-2 text-center flex flex-col justify-center items-center">
            <h2 className="text-xl">{card.title}</h2>
            <hr />
            <p>{card.subtitle}</p>
            <Link to={`/update/${card._id}`}>UPDATE</Link>
            <img className="img-home" src={card.image.url} alt={card.image.alt} />
            <hr />
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => toggleClickedState(index)}
              className={`text-2xl cursor-pointer ${clickedStates[index] ? "text-red-500" : "text-white-200"}`}
            />
          </div>
        ))}
      </div>
    );
  }

  export default Cards;
