import { useReducer, useCallback } from "react";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoading: true, error: null, data: null, extra: action.extra };
    case "RESPONSE":
      return { ...curHttpState, isLoading: false, data: action.responseData };
    case "ERROR":
      return { isLoading: false, error: action.errorData };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not fet there!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    data: null,
    extra: null,
  });

  const sendRequest = useCallback((url, method, body, reqExtra) => {
    dispatchHttp({ type: "SEND", extra: reqExtra });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // setIngredients((prevIng) =>
        //   [...prevIng].filter((ig) => ig.id !== ingId)
        // );
        return res.json();
      })
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData: responseData });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", errorData: err.message });
      });
  }, []);

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
  };
};

export default useHttp; // your custom hook can share logit not data for different component who use it.
