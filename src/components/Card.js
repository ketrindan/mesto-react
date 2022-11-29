import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  );  


  function handleClick() {
    props.onCardClick(props.card);
  }


  function handleLikeClick() {
    props.onCardLike(props.card);
  }


  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }


  return (
    <article className="elements__item">
      {isOwn && <button className="elements__delete-btn" onClick={handleDeleteClick}></button>}
      <img src={props.card.link} className="elements__image" alt={`картинка ${props.card.name}`} onClick={handleClick}/>
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
          <div className="elements__like-box">
            <button type="button" className={cardLikeButtonClassName} aria-label="like" onClick={handleLikeClick}></button>
            <span className="elements__like-counter">{props.card.likes.length}</span>
          </div>
      </div>
    </article>
  )
}

export default Card;
