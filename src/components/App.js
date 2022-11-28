import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});


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


  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }


  useEffect(() => {
    Promise.all([api.getUserData()])
    .then(([userData]) => {
      setCurrentUser(userData);
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

          <PopupWithForm 
            name="elements" 
            title="Новое место"
            children={<>
              <input type="text" className="form__input form__input_type_place" id="place-input" name="place" placeholder="Название" required minLength="2" maxLength="30"/>
              <span className="form__input-error place-input-error"></span>
              <input type="url" className="form__input form__input_type_link" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
              <span className="form__input-error link-input-error"></span>
            </>}
            buttonText="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

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
          />
          <Footer />

        </div>      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
