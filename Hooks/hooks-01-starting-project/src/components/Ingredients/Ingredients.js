import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngs) => {
    setIngredients(filteredIngs);
  }, []);

  const obj = { a: 1, b: 2 };

  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const loadedIngs = [];
  //       for (const key in data) {
  //         loadedIngs.push({
  //           id: key,
  //           title: data[key].title,
  //           amount: data[key].amount,
  //         });
  //       }
  //       setIngredients(loadedIngs);
  //     });
  // }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
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
    setIsLoading(true);
    fetch(
      `https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients/${ingId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        setIsLoading(false);
        setIngredients((prevIng) =>
          [...prevIng].filter((ig) => ig.id !== ingId)
        );
      })
      .catch((err) => {
        setError("Sth wrong!");
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} obj={obj} />
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
