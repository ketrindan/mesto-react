import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup(props) {
	const { values, errors, isValid, onChange, resetForm } = useForm({
    place: "",
    link: "",
  });


	function handleSubmit(e) {
		e.preventDefault();

		props.onAddPlace(values.place, values.link);
	}


  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);
  

	return (
		<PopupWithForm 
      name="elements" 
      title="Новое место"
      children={<>
        <input type="text" className="form__input form__input_type_place" id="place-input" name="place" 
					placeholder="Название" required minLength="2" maxLength="30" value={values.place} onChange={onChange}/>
        <span className={"form__input-error place-input-error" + " " + (errors.place ? "form__input-error_active" : "")}>{errors.place}</span>
        <input type="url" className="form__input form__input_type_link" id="link-input" name="link" 
					placeholder="Ссылка на картинку" required value={values.link} onChange={onChange}/>
        <span className={"form__input-error link-input-error" + " " + (errors.link ? "form__input-error_active" : "")}>{errors.link}</span>
      </>}
      buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
			onSubmit={handleSubmit}
      isValid = {isValid}
    />
	)
}

export default AddPlacePopup;