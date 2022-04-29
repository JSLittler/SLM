// import ApiClient from "./apiClient";
import { resetOptions } from "../redux/reducers/actions/creators";

const save = async (dispatch, game) => {
  // save game

  resetOptions(dispatch);
};

export default save;
