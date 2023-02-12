import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

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
          {props.cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main;