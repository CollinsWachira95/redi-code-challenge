import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import MenuItem from "../components/MenuItem/MenuItem.jsx";
import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";

const RestaurantView = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const debouncedEffectHook = useDebouncedCallback(() => {
    let currentEffect = true;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
    )
      .then(res => res.ok ? res.json() : { meals: null })
      .then(result => {
        if (!currentEffect) return;
        setDishes(result.meals ?? []);
      })
      .catch(() => {
        if (!currentEffect) return;
        setDishes([]);
      });
    return () => {
      currentEffect = false;
    };
  }, 500);

  useEffect(debouncedEffectHook, [debouncedEffectHook, searchTerm]);

  const toggleWishlist = (dishId) => {
    setWishlist((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Find dishes in wishlist from the loaded dishes
  const wishedDishes = dishes.filter((dish) => wishlist.includes(dish.idMeal));

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <SearchField value={searchTerm} onChange={setSearchTerm} />
      </NavBar>

      {/* Layout: flex. Menu takes all, wishlist is a fixed small column */}
      <div style={{ display: "flex", alignItems: "flex-start" }} className={styles.restaurantWrapper}>
        {/* Menu Section */}
        <div style={{ flex: "1 1 0%" }}>
          <div className={styles.menu}>
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <MenuItem
                  dish={dish}
                  key={dish.idMeal}
                  isWished={wishlist.includes(dish.idMeal)}
                  toggleWishlist={() => toggleWishlist(dish.idMeal)}
                />
              ))
            ) : (
              <p>No dishes found :(</p>
            )}
          </div>
        </div>
        {/* Wishlist Section */}
        <aside
          style={{
            width: 220,
            minWidth: 180,
            maxWidth: 260,
            marginLeft: 24,
            padding: "0.75rem 1rem",
            background: "#f1f1f1",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            position: "sticky",
            top: 24,
            height: "fit-content"
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 12, textAlign: "center" }}>Wishlist</h3>
          {wishedDishes.length === 0 ? (
            <p style={{ fontSize: 14, color: "#555", textAlign: "center" }}>No items yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {wishedDishes.map((dish) => (
                <li key={dish.idMeal} style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
                  <img
                    src={dish.strMealThumb}
                    alt={dish.strMeal}
                    style={{ width: 32, height: 32, borderRadius: "4px", objectFit: "cover", marginRight: 8 }}
                  />
                  <span style={{ fontSize: 14, flex: 1 }}>{dish.strMeal}</span>
                  <button
                    onClick={() => toggleWishlist(dish.idMeal)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#d33",
                      cursor: "pointer",
                      fontSize: 17,
                      marginLeft: 4,
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}
                    title="Remove from wishlist"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </>
  );
};

export default RestaurantView;