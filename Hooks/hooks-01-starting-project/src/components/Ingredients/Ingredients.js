import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const loadedIngs = [];
        for (const key in data) {
          loadedIngs.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        setIngredients(loadedIngs);
      });
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setIngredients((prevIng) => [
          ...prevIng,
          {
            id: data.name,
            ...ingredient,
          },
        ]);
      });
  };

  const onRemoveIngHandler = (ingId) => {
    setIngredients((prevIng) => [...prevIng].filter((ig) => ig.id !== ingId));
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={onRemoveIngHandler}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
