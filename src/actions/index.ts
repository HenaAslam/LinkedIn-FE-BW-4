import { Dispatch } from "redux";
import { IAllPosts } from "../interfaces/IAllPosts";
import { IProfile } from "../interfaces/IProfile";

export const GET_ALL_PROFILES = "GET_ALL_PROFILES";
export const GET_EXPERIENCE = "GET_EXPERIENCE";
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const GET_POST = "GET_POST";
export const SET_UNIQUE_PROFILES = "SET_UNIQUE_PROFILES";
export const ADD_TO_LIKES = "ADD_TO_LIKES";
export const REMOVE_FROM_LIKES = "REMOVE_FROM_LIKES";
export const SEARCH_PROFILE = "SEARCH_PROFILE";

export const fetchAllProfilesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`);

      if (response.ok) {
        let profiles = await response.json();

        dispatch({
          type: GET_ALL_PROFILES,
          payload: profiles,
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchExperienceAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        let users = await res.json();

        const idOfFirstUser: string = users[0]._id;

        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${idOfFirstUser}/experiences`
        );

        if (response.ok) {
          let exp = await response.json();

          dispatch({
            type: GET_EXPERIENCE,
            payload: exp,
          });
        } else {
          console.log("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postJobAction = (job: {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  stillWorkingHere: boolean;
  description: string;
  area: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        let users = await res.json();

        const idOfFirstUser: string = users[0]._id;
        console.log(idOfFirstUser);
        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${idOfFirstUser}/experiences`,
          {
            method: "POST",
            body: JSON.stringify(job),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("posted");
          let data = await response.json();

          return data;
        } else {
          console.log("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteJobAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        let users = await res.json();

        const idOfFirstUser: string = users[0]._id;
        console.log(idOfFirstUser);
        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${idOfFirstUser}/experiences/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("deleted");
        } else {
          alert("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMyProfileAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (response.ok) {
        let myProfile = (await response.json())[0];

        dispatch({ type: GET_MY_PROFILE, payload: myProfile });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUniqueProfilesAction = (uniqueProfilesArray: IProfile[]) => {
  return {
    type: SET_UNIQUE_PROFILES,
    payload: uniqueProfilesArray,
  };
};

export const editJobAction = (
  job: {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    stillWorkingHere: boolean;
    description: string;
    area: string;
  },
  id: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        let users = await res.json();

        const idOfFirstUser: string = users[0]._id;
        console.log(idOfFirstUser);
        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${idOfFirstUser}/experiences/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(job),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          // let data = await response.json();
          console.log("edited");
        } else {
          alert("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editMyProfileAction = (editProfile: {
  name: string;
  surname: string;
  area: string;
  image: string;
  title: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        let users = await res.json();

        const idOfFirstUser: string = users[0]._id;
        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${idOfFirstUser}`,
          {
            method: "PUT",
            body: JSON.stringify(editProfile),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Edited");
        } else {
          alert("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editBioAction = (about: { bio: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (response.ok) {
        let myProfile = (await response.json())[0];
        let res = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}`,
          {
            method: "PUT",
            body: JSON.stringify(about),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          console.log("Edited");
        } else {
          alert("Error");
        }
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPostsAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`);
      if (response.ok) {
        let post = await response.json();
        console.log(post);

        const posts = post.posts.slice(-20) as IAllPosts[];
        // const posts = post.posts as IAllPosts[];
        dispatch({ type: GET_POST, payload: posts });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/` + id,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("deleted");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const addToLikesAction = (like: any, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${like._id}/like`,
        {
          method: "POST",
          body: JSON.stringify({ userId: userId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("liked");
        let likesss = await response.json();
        console.log(likesss);
        return likesss;
        // return {
        //   type: ADD_TO_LIKES,
        //   payload: like,
        // };
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromLikesAction = (i: any) => {
  return {
    type: REMOVE_FROM_LIKES,
    payload: i,
  };
};

export const editPostAction = (editPost: { text: string }, id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/` + id,
        {
          method: "PUT",
          body: JSON.stringify(editPost),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Edited");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProfileAction = (profile: any) => {
  return {
    type: SEARCH_PROFILE,
    payload: profile,
  };
};
