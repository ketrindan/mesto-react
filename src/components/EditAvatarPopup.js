import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
	const avatarRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
	
		props.onUpdateAvatar(avatarRef.current.value);
	} 

	return (
		<PopupWithForm 
      name="avatar" 
      title="Обновить аватар"
      children={<>
        <input type="url" className="form__input form__input_type_avatar" id="avatar-input" name="avatar" 
					placeholder="Ссылка на аватар" required ref={avatarRef}/>
        <span className="form__input-error avatar-input-error"></span>
      </>}
      buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
			onSubmit={handleSubmit}
    />
	)
}

export default EditAvatarPopup;