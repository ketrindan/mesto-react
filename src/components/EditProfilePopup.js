import React, { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from "../hooks/useForm";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const { values, errors, isValid, onChange, resetForm } = useForm({
        name: "",
        job: "",
    });


    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser(values.name, values.job);
    }


    useEffect(() => {
        resetForm({ name: currentUser.name, job: currentUser.about });
    }, [currentUser, props.isOpen, resetForm]); 

    
    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль"
            children={<>
                <input type="text" className="form__input form__input_type_name" id="name-input" name="name" placeholder="Имя" 
                    required minLength="2" maxLength="40" value={values.name || ""} onChange={onChange}/>
                <span className={"form__input-error name-input-error " +(errors.name ? "form__input-error_active" : "")}>{errors.name }</span>
                <input type="text" className="form__input form__input_type_job" id="job-input" name="job" 
                    placeholder="О себе" required minLength="2" maxLength="200" value={values.job || ""} onChange={onChange}/>
                <span className={"form__input-error job-input-error " +(errors.job ? "form__input-error_active" : "")}>{errors.job}</span>
            </>}
            buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
			isValid = {isValid}
        />
    )
}

export default EditProfilePopup;