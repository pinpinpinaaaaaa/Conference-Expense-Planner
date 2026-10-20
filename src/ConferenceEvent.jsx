import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from './venueSlice';
import { incrementAvQuantity, decrementAvQuantity } from './avSlice';
import { toggleMealSelection } from './mealsSlice';
import ItemCard from './ItemCard';
import TotalCost from './TotalCost';

import { formatMoney } from './utils';

const NAV = [
  { id: 'venue', label: 'Venue' },
  { id: 'addons', label: 'Add-ons' },
  { id: 'meals', label: 'Meals' },
];

function ConferenceEvent({ onHome }) {
  const [showDetails, setShowDetails] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [activeSection, setActiveSection] = useState('venue');

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const calculateTotalCost = (section) => {
    if (section === 'venue') return venueItems.reduce((sum, i) => sum + i.cost * i.quantity, 0);
    if (section === 'av') return avItems.reduce((sum, i) => sum + i.cost * i.quantity, 0);
    if (section === 'meals')
      return mealsItems.reduce((sum, i) => (i.selected ? sum + i.cost * numberOfPeople : sum), 0);
    return 0;
  };

  const venueTotalCost = calculateTotalCost('venue');
  const avTotalCost = calculateTotalCost('av');
  const mealsTotalCost = calculateTotalCost('meals');
  const totalCosts = { venue: venueTotalCost, av: avTotalCost, meals: mealsTotalCost };
  const grandTotal = venueTotalCost + avTotalCost + mealsTotalCost;

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((i) => i.quantity > 0 && items.push({ ...i, type: 'venue' }));
    avItems.forEach((i) => i.quantity > 0 && items.push({ ...i, type: 'av' }));
    mealsItems.forEach((i) => i.selected && items.push({ ...i, type: 'meals', numberOfPeople }));
    return items;
  };

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePeopleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfPeople(Number.isNaN(value) ? 0 : Math.max(0, Math.min(value, 10000)));
  };

  return (
    <div className="planner">
      <header className="navbar">
        <div className="navbar__inner">
          <button className="brand" onClick={onHome} title="Back to home">
            <span className="brand__logo">$</span>
            <span className="brand__text">Conference Expense Planner</span>
          </button>
          <nav className="navbar__links" aria-label="Sections">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={activeSection === n.id ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, n.id)}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="navbar__actions">
            <span className="navbar__total">
              <small>Total</small>
              {formatMoney(grandTotal)}
            </span>
            <button className="btn btn--primary" onClick={() => setShowDetails(true)}>
              Show Details
            </button>
          </div>
        </div>
      </header>

      <main className="planner__content">
        <section id="venue" className="section">
          <SectionHeader
            title="Venue Room Selection"
            subtitle="Choose the rooms you need for your conference."
          />
          <div className="grid">
            {venueItems.map((item, index) => (
              <ItemCard
                key={item.name}
                item={item}
                meta={`Capacity: ${item.capacity}`}
                onIncrement={() => dispatch(incrementQuantity(index))}
                onDecrement={() => dispatch(decrementQuantity(index))}
                canIncrement={item.quantity < item.max}
              />
            ))}
          </div>
          <Subtotal amount={venueTotalCost} />
        </section>

        <section id="addons" className="section">
          <SectionHeader
            title="Add-ons Selection"
            subtitle="Audio & visual equipment for your presentations."
          />
          <div className="grid">
            {avItems.map((item, index) => (
              <ItemCard
                key={item.name}
                item={item}
                onIncrement={() => dispatch(incrementAvQuantity(index))}
                onDecrement={() => dispatch(decrementAvQuantity(index))}
              />
            ))}
          </div>
          <Subtotal amount={avTotalCost} />
        </section>

        <section id="meals" className="section">
          <SectionHeader
            title="Meals Selection"
            subtitle="Catering for your participants, priced per person."
          />
          <div className="people">
            <label htmlFor="numberOfPeople">Number of People</label>
            <input
              id="numberOfPeople"
              type="number"
              inputMode="numeric"
              min="1"
              value={numberOfPeople}
              onChange={handlePeopleChange}
            />
          </div>
          <div className="meals">
            {mealsItems.map((item, index) => (
              <label key={item.name} className={`meal ${item.selected ? 'is-selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => dispatch(toggleMealSelection(index))}
                />
                <span className="meal__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="meal__media">
                  <img src={item.img} alt="" loading="lazy" />
                </span>
                <span className="meal__body">
                  <span className="meal__name">{item.name}</span>
                  <span className="meal__price">
                    {formatMoney(item.cost)} <small>/ person</small>
                  </span>
                </span>
              </label>
            ))}
          </div>
          <Subtotal amount={mealsTotalCost} />
        </section>
      </main>

      <div className="mobile-bar">
        <div>
          <small>Total cost</small>
          <strong>{formatMoney(grandTotal)}</strong>
        </div>
        <button className="btn btn--primary" onClick={() => setShowDetails(true)}>
          Show Details
        </button>
      </div>

      {showDetails && (
        <TotalCost
          totalCosts={totalCosts}
          items={getItemsFromTotalCost()}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section__header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function Subtotal({ amount }) {
  return (
    <div className="subtotal">
      <span>Total Cost</span>
      <strong>{formatMoney(amount)}</strong>
    </div>
  );
}

export default ConferenceEvent;
