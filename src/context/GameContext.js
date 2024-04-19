import { createContext, useReducer } from 'react';

export const GameContext = createContext();

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME': 
      return {
        game : action.payload
      }
    case 'CREATE_GAME':
      return {
        game : [action.payload, ...state.game]
      }

    default:
      return state
  }
}

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    game: null
  });


  return (
    <GameContext.Provider value={{...state, dispatch}}>
      { children }
    </GameContext.Provider>
  );
}