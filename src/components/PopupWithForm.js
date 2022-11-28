function PopupWithForm(props) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      {props.onClose()}
    }
  }

  return(
    <section className={`popup ${props.name}-popup ${props.isOpen ? "popup_opened" : ""}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button type="button" className={`button popup__close-btn ${props.name}-popup__close-btn`} aria-label="close" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`form form-${props.name}`} name={`${props.name}-form`} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className={`button submit-btn ${props.name}-popup-submit-btn`}>{props.buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;