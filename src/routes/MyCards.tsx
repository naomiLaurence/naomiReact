import React, { useEffect, useState, useContext, FC } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinners from '../components/Spinners';
import { AuthContext } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { CardType } from "../@types/types";
import Swal from 'sweetalert2';
import './Cards.scss';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Card } from '../@types/cardsData';
import FavoriteButton from '../components/FavoriteButton';


const MyCards: FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const token = authContext ? authContext.token : null;
    const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const { searchTerm } = useSearch();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;  // Exit early if no token
        }

        // API Call
        setLoading(true);
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
            headers: { 'x-auth-token': token }
        })
            .then(response => {
                setCards(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.toString());
                setLoading(false);
            });
    }, [token]);

    /* const deleteCard = (cardId: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: { 'x-auth-token': token }
            })
                .then(() => {
                    // Remove card from state
                    setCards(cards.filter(card => card._id !== cardId));
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                });
        }
    }; */



    const deleteCard = (cardId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                    headers: { 'x-auth-token': token }
                })
                    .then(() => {
                        setCards(cards.filter(card => card._id !== cardId)); // Update state
                        Swal.fire(
                            'Deleted!',
                            'Your card has been deleted.',
                            'success'
                        )
                    })
                    .catch(err => {
                        console.error("Error deleting card:", err);
                        Swal.fire(
                            'Failed!',
                            'There was a problem deleting your card.',
                            'error'
                        )
                    });
            }
        });
    };



    // Function to handle adding/removing favorites
    const addToFavorites = (cardId: string) => {
        const newFavorites = favorites.includes(cardId)
            ? favorites.filter(id => id !== cardId)  // Remove from favorites
            : [...favorites, cardId];  // Add to favorites
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const filteredCards = cards.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;

    // MyCards.tsx
    return (
        <div className="cards-container dark:bg-gray-700">
            {filteredCards.map((card) => ( // Change `cards` to `filteredCards`
                <div key={card._id} className="card dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
                    <div className="card-actions">
                        <Link to={`/update/${card._id}`} className="card-edit-icon">
                            <FaEdit />
                        </Link>
                        <FaTrash
                            onClick={() => deleteCard(card._id)}
                            className="card-delete-icon"
                        />
                    </div>
                    <Link to={`/cards/${card._id}`} className="card-link">
                        <FavoriteButton
                            cardId={card._id}
                            isFavorite={favorites.includes(card._id)}
                            onToggleFavorite={addToFavorites} token={''} />
                        <h2 className="card-title">{card.title}</h2>
                        <hr />
                        <p className="card-subtitle">{card.subtitle}</p>
                        <img src={card.image.url} alt={card.image.alt} className="card-image" />
                    </Link>
                </div>
            ))}
        </div>
    );

};

export default MyCards;