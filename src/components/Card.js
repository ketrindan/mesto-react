function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="elements__item">
      <button className="button elements__delete-btn"></button>
      <img src={props.card.link} className="elements__image" alt={`картинка ${props.card.name}`} onClick={handleClick}/>
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
          <div className="elements__like-box">
            <button type="button" className="button elements__like" aria-label="like"></button>
            <span className="elements__like-counter">{props.card.likes.length}</span>
          </div>
      </div>
    </article>
  )
}

export default Card;