import { useEffect, useState } from "react";
import { useCheckMutation } from "../services/api";
import { useAppDispatch } from "../store/hooks";
import { setCredentials, startFetching } from "../store";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [check] = useCheckMutation();

  useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  const checkToken = async () => {
    dispatch(startFetching());
    try {
      const user = await check().unwrap();

      dispatch(setCredentials(user));
    } catch (error) {
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return [isCheckingAuth];
};
