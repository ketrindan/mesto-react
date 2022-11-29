import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [place, setPlace] = useState('');
	const [link, setLink] = useState('');


	function handleAddPlace(e) {
    setPlace(e.target.value);
  }


	function handleAddLink(e) {
    setLink(e.target.value);
  }


	function handleSubmit(e) {
		e.preventDefault();

		props.onAddPlace(place, link);
	}


  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

		
	return (
		<PopupWithForm 
      name="elements" 
      title="Новое место"
      children={<>
        <input type="text" className="form__input form__input_type_place" id="place-input" name="place" 
					placeholder="Название" required minLength="2" maxLength="30" value={place} onChange={handleAddPlace}/>
        <span className="form__input-error place-input-error"></span>
        <input type="url" className="form__input form__input_type_link" id="link-input" name="link" 
					placeholder="Ссылка на картинку" required value={link} onChange={handleAddLink}/>
        <span className="form__input-error link-input-error"></span>
      </>}
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
			onSubmit={handleSubmit}
    />
	)
}

export default AddPlacePopup;