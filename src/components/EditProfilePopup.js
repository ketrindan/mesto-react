import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const currentUser = useContext(CurrentUserContext);

	function handleNameChange(e) {
    setName(e.target.value);
  }


	function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }


	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateUser(name, description);
	}


	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen]); 

	
	return (
		<PopupWithForm 
			name="profile" 
			title="Редактировать профиль"
			children={<>
				<input type="text" className="form__input form__input_type_name" id="name-input" name="name" placeholder="Имя" 
					required minLength="2" maxLength="40" value={name || ""} onChange={handleNameChange}/>
				<span className="form__input-error name-input-error"></span>
				<input type="text" className="form__input form__input_type_job" id="job-input" name="job" 
					placeholder="О себе" required minLength="2" maxLength="200" value={description || ""} onChange={handleDescriptionChange}/>
				<span className="form__input-error job-input-error"></span>
			</>}
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		/>
	)
}

export default EditProfilePopup;