import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription , setUserDescription ] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cardsdata])=> {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cardsdata);
    })
    .catch((err) => {
      console.log(err);
    })
  })

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
            <img src={userAvatar} className="profile__avatar" alt="Аватар"/>
          </div>
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <button type="button" className="button button_action_edit" aria-label="edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="button button_action_add" aria-label="add" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <div className="elements__container">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main;