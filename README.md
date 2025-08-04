# ReDI React Restaurant

This project is a simple restaurant menu web app built in React. It demonstrates:
- Live dish search functionality using an external API
- A user wishlist for favorite dishes, displayed in a sidebar
- Modern React component and state management patterns

## Features

### 1. Dish Search
- The menu automatically loads all available dishes on first visit.
- A search field at the top lets users type to filter dishes by name, with a debounce for efficient API querying.
- The list updates in real time as you type.

### 2. Wishlist
- Each dish has an "Add to Wishlist" or "Remove from Wishlist" button.
- Clicking "Add to Wishlist" stores the dish in your wishlist.
- Your wishlist is displayed as a small, fixed sidebar on the right side of the page.
- Dishes in the wishlist can be quickly removed with the "×" button next to each item.
- The wishlist updates instantly and does not interfere with browsing or searching the menu.

## How It Works

- **State Management:**  
  The app uses React's `useState` to track loaded dishes, the current search term, and the user's wishlist (by dish ID).
- **Searching:**  
  When the user types in the search input, a debounced API request fetches matching dishes from [TheMealDB API](https://www.themealdb.com/api.php).
- **Wishlist Functionality:**  
  A `toggleWishlist` function adds or removes a dish's ID from the wishlist state. The sidebar displays all wished-for dishes using their details from the current search results.

## Main Code Changes

- **Added Search State:**  
  Connected the search input to state and API fetch.
- **Added Wishlist State:**  
  Introduced a wishlist array and logic to add/remove items.
- **Sidebar Wishlist UI:**  
  Added a right-aligned, visually separate wishlist using CSS flex and inline styles.
- **MenuItem Component Update:**  
  Now supports wishlist buttons and props for seamless integration.

## How to Run

1. Clone the repository  
   `git clone https://github.com/ReDI-School/web-circle-excercise.git`
2. Install dependencies  
   `npm install`
3. Start the development server  
   `npm run dev`
4. Visit [http://localhost:5173/](http://localhost:5173/) in your browser

## Notes

- Wishlist is session-based only; it resets on refresh.
- The app uses [TheMealDB](https://www.themealdb.com/api.php) for dish data.
- The UI is intentionally simple and focuses on React logic and usability.

---

**Made by Collins Wachira for the ReDI School React Code Challenge**
