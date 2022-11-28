import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 


  function handleCardDelete(cardId) {  
    api.deleteCard(cardId)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== cardId));
    });
  }


  useEffect(() => {
    Promise.all([api.getCards()])
    .then(([cardsdata])=> {
      setCards(cardsdata);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар"/>
          </div>
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="button button_action_edit" aria-label="edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="button button_action_add" aria-label="add" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <div className="elements__container">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main;