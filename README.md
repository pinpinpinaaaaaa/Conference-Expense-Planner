# Conference Expense Planner

A front-end web app for budgeting a conference at a convention center. Users choose venue rooms, audio/visual add-ons, and catered meals, and the app works out the cost of each section and of the whole event.

> 📚 This is the practice project from the **[Developing Front-End Apps with React](https://www.coursera.org/learn/developing-frontend-apps-with-react)** course by IBM on Coursera.

## Features

- **Landing page:** background image, company name (BudgetEase Solutions), an About Us paragraph, and a **Get Started** button that opens the planner.
- **Product selection page** with a sticky navbar that links to each section:
  - **Venue Room Selection:** 5 room types, each with a + / − stepper. Auditorium Hall is limited to 3 and the other rooms to 10.
  - **Add-ons Selection:** 5 AV items (projectors, speakers, microphones, whiteboards, signage), each with a stepper.
  - **Meals Selection:** an input for the number of people and a checkbox card for each meal, priced per person.
  - A subtotal under each section, plus a running grand total.
- **Show Details pop-up:** a table with Name, Unit Cost, Quantity, and Total Cost columns, followed by the grand total for the event. Close it with the X button, a click outside the panel, or the Esc key.
- **Responsive layout** for desktop, tablet, and phone. On phones there is a floating total bar at the bottom, the pop-up opens as a bottom sheet, and each table row becomes a stacked card.

## Pricing

| Venue room | Capacity | Price |
| --- | --- | --- |
| Conference Room | 15 | $1,500 |
| Auditorium Hall | 200 | $5,500 |
| Presentation Room | 50 | $3,500 |
| Large Meeting Room | 10 | $1,000 |
| Small Meeting Room | 5 | $800 |

| Add-on | Price |
| --- | --- |
| Projectors | $200 |
| Speaker | $35 |
| Microphones | $45 |
| Whiteboards | $80 |
| Signage | $80 |

| Meal | Price per person |
| --- | --- |
| Breakfast | $50 |
| High Tea | $25 |
| Lunch | $65 |
| Dinner | $70 |

These prices follow the course lab screenshots. The course instructions list some different prices; to use those, edit [src/venueSlice.js](src/venueSlice.js), [src/avSlice.js](src/avSlice.js), and [src/mealsSlice.js](src/mealsSlice.js).

## Tech stack

- [React 18](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and React Redux for state management
- [Vite](https://vitejs.dev/) for the dev server and build
- Plain CSS with custom properties: white and cream base, sky blue accents, [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font
- Photos from [Unsplash](https://unsplash.com/)

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── main.jsx             # Entry point; wraps App in the Redux Provider
├── App.jsx              # Landing page; switches to the planner on Get Started
├── AboutUs.jsx          # Company description on the landing page
├── ConferenceEvent.jsx  # Product selection page: navbar, venue, add-ons, meals
├── ItemCard.jsx         # Reusable card with image, price, and +/− stepper
├── TotalCost.jsx        # Show Details pop-up with the cost table
├── store.js             # Redux store
├── venueSlice.js        # Venue rooms state and reducers
├── avSlice.js           # Add-ons state and reducers
├── mealsSlice.js        # Meals state and reducers
├── utils.js             # Currency formatting helper
└── index.css            # All styles
```

## Acknowledgements

- Course: [Developing Front-End Apps with React](https://www.coursera.org/learn/developing-frontend-apps-with-react) by IBM on Coursera
- Images: [Unsplash](https://unsplash.com/)
