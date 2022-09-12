import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setIngredients((prevIng) => [
      ...prevIng,
      {
        id: Math.random().toString(),
        ...ingredient,
      },
    ]);
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
