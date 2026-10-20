import { useState } from 'react';
import ConferenceEvent from './ConferenceEvent';
import AboutUs from './AboutUs';

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
    window.scrollTo({ top: 0 });
  };

  if (showVenue) {
    return <ConferenceEvent onHome={() => setShowVenue(false)} />;
  }

  return (
    <main className="landing">
      <div className="landing__bg" aria-hidden="true" />
      <div className="landing__inner">
        <section className="landing__hero">
          <span className="eyebrow">BudgetEase Solutions</span>
          <h1>
            Conference <span className="accent">Expense</span> Planner
          </h1>
          <p className="landing__tagline">Plan your next major event with us!</p>
          <button className="btn btn--primary btn--lg" onClick={handleGetStarted}>
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ul className="landing__stats">
            <li><strong>5</strong> room types</li>
            <li><strong>5</strong> AV add-ons</li>
            <li><strong>4</strong> meal plans</li>
          </ul>
        </section>
        <AboutUs />
      </div>
    </main>
  );
}

export default App;
