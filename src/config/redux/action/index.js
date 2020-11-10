import firebase, { database } from "../../firebase";

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Ariya Agustian" });
  }, 2000);
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        dispatch({ type: "CHANGE_LOADING", value: false });
        // var errorCode = error.code;
        // var errorMessage = error.message;
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };

        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function (error) {
        // Handle Errors here.
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        var errorCode = error.code;
        var errorMessage = error.message;
        error = {
          errorCode: errorCode,
          errorMessage: errorMessage,
        };
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
  });
};
