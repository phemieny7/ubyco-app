import createDataContext from "./createDataContext";
import Server from "../api/Server";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Url = "https://ubycohub-server.herokuapp.com";

const homeReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "get_user":
      return { ...state, user: action.payload };
    case "get_card":
      return { ...state, card: action.payload };
    case "card_type":
      return { ...state, card_type: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const clearMessage = (dispatch: (arg0: { type: string }) => void) => () => {
  dispatch({ type: "clear_error_message" });
};

const getUser = (dispatch: (arg0: { type: string; payload: any }) => void) => {
  return async (callback: (arg0: any) => void) => {
    try {
      const response = await Server.get("/user");
      console.log(response)
      dispatch({ type: "get_user", payload: response.data.message });
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const getCard = (dispatch: (arg0: { type: string; payload: any }) => void) => {
  return async () => {
    try {
      const response = await Server.get("/user/card");
      dispatch({ type: "get_card", payload: response.data.message });
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const cardType = (
  dispatch: (arg0: { type: string; payload: string }) => void
) => {
  return async (value: any, callback: (arg0: any) => void) => {
    try {
      const response = await Server.get(`/user/card-type`, {
        params: {
          name: `${value}`,
        },
      });
      callback(response.data.message);
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const coinType = (
  dispatch: (arg0: { type: string; payload: string }) => void
) => {
  return async (callback: (arg0: any) => void) => {
    try {
      const response = await Server.get(`/user/coin`);
      callback(response.data.message);
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const initiateCoinTrade = (dispatch: any) => {
  return async (
    id: number | Blob,
    amount: string | Blob,
    comment: string | Blob,
    image: any,
    rate: string | Blob,
    callback: any
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      let formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append(`receipt[${i}]`, {
          uri: image[i].uri,
          name: image[i].name,
          type: "image/jpg",
        });
      }
      formData.append("coin_id", id);
      formData.append("rate", rate);
      formData.append("amount", amount);
      formData.append("comment", comment);

      const response = await fetch(`${Url}/coin/initiate-trade`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      callback(response.status);
    } catch (error) {
      callback(error.response.status);
    }
  };
};

const initiateCardTrade = (dispatch: any) => {
  return async (
    id: number | Blob,
    amount: string | Blob,
    comment: string | Blob,
    image: any,
    rate: string | Blob,
    callback: any
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      let formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append(`card[${i}]`, {
          uri: image[i].uri,
          name: image[i].name,
          type: "image/jpg",
        });
      }
      formData.append("card_type_id", id);
      formData.append("rate", rate);
      formData.append("amount", amount);
      formData.append("comment", comment);

      const response = await fetch(`${Url}/giftcard/initiate-trade`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      callback(response.status);
    } catch (error) {
      callback(error.response.status);
    }
  };
};

const fetchBank = (
  dispatch: (arg0: { type: string; payload: string }) => void
) => {
  return async (callback: (arg0: any) => void) => {
    try {
      const response = await Server.get(`/list-banks`);
      callback(response.data.message);
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const getAccount = (
  dispatch: (arg0: { type: string; payload: string }) => void
) => {
  return async (callback: (arg0: any) => void) => {
    try {
      const response = await Server.get(`/user/get-account`);
      callback(response.data.message);
    } catch (err) {
      dispatch({ type: "add_error", payload: "Network error" });
    }
  };
};

const bankAccountName = (dispatch: any) => {
  return async (
    code: any,
    accountNumber: any,
    callback: (arg0: any) => void
  ) => {
    try {
      const response = await Server.get(`/user/get-account-name`, {
        params: {
          account_number: `${accountNumber}`,
          bank_code: `${code}`,
        },
      });
      callback(response.data.message);
    } catch (error) {
      callback(error.response.status);
    }
  };
};

const addAccount = (dispatch: any) => {
  return async (
    code: any,
    accountName: any,
    accountNumber: any,
    bankName: any,
    callback: (arg0: any) => void
  ) => {
    try {
      const response = await Server.post(`/user/add-account/`, {
        bank_code: code,
        account_number: accountNumber,
        account_name: accountName,
        bank: bankName,
      });
      callback(response.status);
    } catch (error) {
      callback(error.response.status);
    }
  };
};

const withdraw = (dispatch: any) => {
  return async (value: string, amount: number, callback: any) => {
    try {
      const response = await Server.post("/user/withdraw", {
        amount: value,
        bank: amount,
      });
      callback(response);
    } catch (error) {
      callback(error.response);
    }
  };
};

const updateProfile = (dispatch: any) => {
  return async (
    email: string,
    fullname: string,
    phone: string,
    image: any,
    callback: any
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      let formData = new FormData();
      // formData.append(`picture`, { uri: image.uri, name: image.name, type: 'image/jpg' })
      formData.append("fullname", fullname);
      formData.append("phone", phone);
      formData.append("email", email);

      const response = await fetch(`${Url}/user/profile`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      callback(response.status);
    } catch (error) {
      callback(error.response.status);
    }
  };
};

export const { Context, Provider } = createDataContext(
  homeReducer,
  {
    clearMessage,
    getUser,
    getCard,
    cardType,
    coinType,
    initiateCardTrade,
    initiateCoinTrade,
    fetchBank,
    bankAccountName,
    addAccount,
    getAccount,
    withdraw,
    updateProfile,
  },
  { errorMessage: "", user: "", message: "", card: "" }
);
