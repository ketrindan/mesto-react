import Popup from "./Popup";

function PopupWithForm(props) {

  return(
    <Popup isOpen={props.isOpen} onClose={props.onClose} name={props.name}>
      <h3 className="popup__title">{props.title}</h3>
      <form className={`form form-${props.name}`} name={`${props.name}-form`} noValidate onSubmit={props.onSubmit}>
        {props.children}
        <button type="submit" className={`button submit-btn ${props.name}-popup-submit-btn` + " " + (props.isValid ? "" : "submit-btn_inactive" )} disabled={!props.isValid}>{props.buttonText}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;