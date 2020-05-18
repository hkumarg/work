import axios from "axios";
import { postsApiUrl } from "./constants";
import { Action, Dispatch } from "redux";

export const POSTS_FETCH_BEGIN = "POSTS_FETCH_BEGIN";
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POSTS_FETCH_ERROR = "POSTS_FETCH_ERROR";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostsList = Post[];

export interface PostsAction extends Action {
  posts: PostsList;
}

// Internal action creators
const postsFetchBegin = () => {
  return {
    type: POSTS_FETCH_BEGIN
  };
};

const postsFetchSuccess = (posts: PostsList) => {
  return {
    type: POSTS_FETCH_SUCCESS,
    posts
  };
};

const postsFetchError = () => {
  return {
    type: POSTS_FETCH_ERROR
  };
}; // Action creator that returns function (th                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         unk) instead of an action
// Will be processed by `redux-thunk` middleware
export const postsFetch = () => (dispatch: Dispatch<PostsAction>) => {
  // API request will be executed...
  console.log("dispatch(postsFetchBegin())");

  // ...now
  return axios
    .get(postsApiUrl)
    .then((response: { data: PostsList }) => {
      // Get only 10 first posts, due to task requirements
      // Array should be sliced ASAP, because we don't need large amount of data in an action
      const first10Posts = response.data.slice(0, 10);

      dispatch(postsFetchSuccess(first10Posts));
    })
    .catch(() => {
      // Something is no yes 👎 (thanks Tusk for english lessons)
      console.log("dispatch(postsFetchError())");
    });
};
