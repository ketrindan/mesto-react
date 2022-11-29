import Popup from "./Popup";

function PopupWithConfirmation(props) {

  function onConfirm(e) {
    e.preventDefault();

    props.onConfirm(props.card);
  }

  return(
    <Popup isOpen={props.isOpen} onClose={props.onClose} name={props.name}>
      <h3 className="popup__title">{props.title}</h3>
      <button type="button" className={`button submit-btn ${props.name}-popup-btn`} onClick={onConfirm}>{props.onLoading ? "Удаление..." : "Да"}</button>
    </Popup>
  )
}
  
export default PopupWithConfirmation;