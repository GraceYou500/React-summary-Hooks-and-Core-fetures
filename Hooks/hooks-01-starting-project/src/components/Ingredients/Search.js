import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients, obj } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        //enteredFilter value is the value 500ms before(we pause 500ms), compare with current value from current.value(coz we set 500ms in the setTimeout)

        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        console.log("query", query);
        // it is firebase syntax here, orderBy => search by title here, equalTo => searched value.

        fetch(
          "https://react-hooks-update-2bfc7-default-rtdb.firebaseio.com/ingredients.json" +
            query
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
            onLoadIngredients(loadedIngs);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // return function here is that we only want to measure the latest keystroke pasuse for 500ms, clean up the old keystroke timer => no matter we have many keystroke, we only have one timer, which is for the newest keystroke, so we don't have all these redundant timers in memory.
  }, [enteredFilter, onLoadIngredients, inputRef]);

  console.log("objA", obj.a);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
      <p>{obj.a}</p>
    </section>
  );
});

export default Search;
