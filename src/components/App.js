import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }


  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }


  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }
  

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }


  function handleUpdateUser(newName, newJob) {
    api.setUserData(newName, newJob)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  } 


  function handleUpdateAvatar(newAvatar) {
    api.changeAvatar(newAvatar)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  function handleAddPlaceSubmit(newPlace, newLink) {
    api.addNewCard(newPlace, newLink)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }


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
    Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cardsdata]) => {
      setCurrentUser(userData);
      setCards(cardsdata);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 

          <PopupWithForm 
            name="delete" 
            title="Вы уверены?"
            buttonText="Да"
          />

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <Header />
          <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

        </div>      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
