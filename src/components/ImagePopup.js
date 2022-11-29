import { useEffect } from 'react'

function ImagePopup(props) {
  useEffect(() => {
    if (!props.card.name) return;

    function closeByEscape(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [props.card.name, props.onClose])

  
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClose()
    }
  }
  
  
  return (
    <section className={`popup popup_image image-popup ${props.card.name ? "popup_opened" : ""}`} onClick={handleOverlayClick}>
      <div className="popup__box">
        <button type="button" className="button popup__close-btn image-popup__close-btn" aria-label="close" onClick={props.onClose}></button>
          <img src={props.card.link} className="popup__image" alt={`картинка ${props.card.name}`}/>
          <p className="popup__image-subtitle">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;