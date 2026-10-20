import { useEffect } from 'react';
import { formatMoney } from './utils';

function TotalCost({ totalCosts, items, onClose }) {
  const total = totalCosts.venue + totalCosts.av + totalCosts.meals;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const label = (item) => (item.capacity ? `${item.name} (Capacity: ${item.capacity})` : item.name);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="modal__head">
          <p id="modal-title" className="eyebrow">Total cost for the event</p>
          <p className="modal__total">{formatMoney(total)}</p>
          <div className="modal__chips">
            <span>Venue {formatMoney(totalCosts.venue)}</span>
            <span>Add-ons {formatMoney(totalCosts.av)}</span>
            <span>Meals {formatMoney(totalCosts.meals)}</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty">
            <p>No items selected yet.</p>
            <small>Add rooms, equipment, or meals to see a breakdown here.</small>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={`${item.type}-${item.name}`}>
                    <td data-label="Name">{label(item)}</td>
                    <td data-label="Unit Cost">{formatMoney(item.cost)}</td>
                    <td data-label="Quantity">
                      {item.type === 'meals' ? `For ${item.numberOfPeople} people` : item.quantity}
                    </td>
                    <td data-label="Total Cost">
                      {formatMoney(
                        item.type === 'meals' ? item.cost * item.numberOfPeople : item.cost * item.quantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Grand Total</td>
                  <td>{formatMoney(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TotalCost;
