import { useState } from 'react';
import { formatMoney } from './utils';

function ItemCard({ item, meta, onIncrement, onDecrement, canIncrement = true }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={`card ${item.quantity > 0 ? 'is-active' : ''}`}>
      <div className="card__media">
        {imgError ? (
          <div className="card__placeholder">{item.name.charAt(0)}</div>
        ) : (
          <img src={item.img} alt={item.name} loading="lazy" onError={() => setImgError(true)} />
        )}
        {item.quantity > 0 && <span className="card__badge">{item.quantity} selected</span>}
      </div>
      <div className="card__body">
        <h3>{item.name}</h3>
        {meta && <p className="card__meta">{meta}</p>}
        <p className="card__price">{formatMoney(item.cost)}</p>
        <div className="stepper">
          <button
            type="button"
            className="stepper__btn"
            onClick={onDecrement}
            disabled={item.quantity === 0}
            aria-label={`Decrease ${item.name}`}
          >
            −
          </button>
          <span className="stepper__value" aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            className="stepper__btn stepper__btn--plus"
            onClick={onIncrement}
            disabled={!canIncrement}
            aria-label={`Increase ${item.name}`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
