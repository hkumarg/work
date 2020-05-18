import {
  POSTS_FETCH_BEGIN,
  POSTS_FETCH_ERROR,
  POSTS_FETCH_SUCCESS,
  PostsAction,
  PostsList
} from "./actions";

export interface PostsState {
  posts: PostsList;
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false
};

export const posts = (
  state = initialState,
  action: PostsAction
): PostsState => {
  switch (action.type) {
    case POSTS_FETCH_BEGIN:
      return { ...initialState, loading: true };
    case POSTS_FETCH_SUCCESS:
      return { ...initialState, posts: action.posts };
    case POSTS_FETCH_ERROR:
      return { ...initialState, error: true };
    default:
      return state;
  }
};
