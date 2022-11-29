import { useEffect } from "react";

function Popup (props) {
  useEffect(() => {
    if (!props.isOpen) return;

    function closeByEscape(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [props.isOpen, props.onClose])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      {props.onClose()}
    }
  }

  return (
    <div
      className={`popup ${props.name}-popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className='popup__container'>
        <button type="button" className={`button popup__close-btn ${props.name}-popup__close-btn`} aria-label="close"
          onClick={props.onClose}
        />
        {props.children}
      </div>
    </div>
  );
};

export default Popup;