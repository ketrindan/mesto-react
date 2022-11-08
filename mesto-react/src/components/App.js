import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
    <div className="body">
      <div className="page">

        <PopupWithForm 
          name="profile" 
          title="Редактировать профиль"
          children={<>
            <input type="text" className="form__input form__input_type_name" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className="form__input-error name-input-error"></span>
            <input type="text" className="form__input form__input_type_job" id="job-input" name="job" placeholder="О себе" required minLength="2" maxLength="200"/>
            <span className="form__input-error job-input-error"></span>
          </>}
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

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

        <PopupWithForm 
          name="avatar" 
          title="Обновить аватар"
          children={<>
            <input type="url" className="form__input form__input_type_avatar" id="avatar-input" name="avatar" placeholder="Ссылка на аватар" required/>
            <span className="form__input-error avatar-input-error"></span>
          </>}
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

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
  );
}

export default App;
