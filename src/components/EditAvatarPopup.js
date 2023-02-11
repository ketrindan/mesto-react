import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";


function EditAvatarPopup(props) {
  const { values, errors, isValid, onChange, resetForm } = useForm({
    avatar: "",
  });

	values.avatar = useRef();

	function handleSubmit(e) {
		e.preventDefault();
	
		props.onUpdateAvatar(values.avatar.current.value);
	} 


  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

	return (
		<PopupWithForm 
      name="avatar" 
      title="Обновить аватар"
      children={<>
        <input type="url" className="form__input form__input_type_avatar" id="avatar-input" name="avatar" 
					placeholder="Ссылка на аватар" required onChange={onChange} ref={values.avatar}/>
        <span className={"form__input-error avatar-input-error" + " " + (errors.avatar ? "form__input-error_active" : "")}>{errors.avatar}</span>
      </>}
      buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
			onSubmit={handleSubmit}
      isValid = {isValid}
    />
	)
}

export default EditAvatarPopup;