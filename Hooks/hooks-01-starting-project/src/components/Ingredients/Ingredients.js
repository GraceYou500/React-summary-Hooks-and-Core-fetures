import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

function Ingredients() {
  const {
    isLoading,
    data,
    error,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredients, setIngredients] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({ type: "ADD", ingredient: { id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngs) => {
    // setIngredients(filteredIngs);
    dispatch({ type: "SET", ingredients: filteredIngs });
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

  const addIngredientHandler = useCallback(
    (ingredient) => {
      // dispatchHttp({ type: "SEND" });
      // fetch(
      //   "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(ingredient),
      //     headers: { "Content-Type": "application/json" },
      //   }
      // )
      //   .then((response) => {
      //     dispatchHttp({ type: "RESPONSE" });
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     // return setIngredients((prevIng) => [
      //     //   ...prevIng,
      //     //   {
      //     //     id: data.name,
      //     //     ...ingredient,
      //     //   },
      //     // ]);
      //     return dispatch({
      //       type: "ADD",
      //       ingredient: { id: data.name, ...ingredient },
      //     });
      //   });
      sendRequest(
        "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const onRemoveIngHandler = useCallback(
    (ingId) => {
      sendRequest(
        `https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients/${ingId}.json`,
        "DELETE",
        null,
        ingId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={onRemoveIngHandler}
      />
    );
  }, [ingredients, onRemoveIngHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} obj={obj} />
        {ingredientList}
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
