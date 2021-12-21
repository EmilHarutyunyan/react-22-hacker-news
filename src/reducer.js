import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      const newHits = state.hits.filter(
        hit => hit.objectID !== action.payload.id
      );
      return { ...state, hits: newHits };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload.query, page: 0 };
    case HANDLE_PAGE:
      if (action.payload.value === "inc") {
        let nextPage = state.page + 1 > state.nbPages - 1 ? 0 : state.page + 1;
        return {...state, page:nextPage};
      }
      if (action.payload.value === "dec") {
        let prevPage = state.page - 1 < 0 ? state.nbPages - 1 : state.page - 1;
        return {...state, page:prevPage};
      }
      break;
    default:
      throw new Error(`no matching "${action.type}" action type`);
      
  }
};
export default reducer;
