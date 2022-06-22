import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  selectIsIdle,
  selectIsLoggedIn,
  selectIsLoading,
  clearCart,
} from "../../store";

import styles from "../Placeholder.module.css";

import { useGetProfileMutation, useLogoutMutation } from "../../services/auth";
import { useRouter } from "next/router";
import { OrderCard } from "./Cards/OrderCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export const UserHeader: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [logout] = useLogoutMutation();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);
  const isIdle = useAppSelector(selectIsIdle);

  const [getProfile, result] = useGetProfileMutation();

  useEffect(() => {
    if (isLoggedIn) {
      getProfile();
    }
  }, [isLoggedIn, getProfile]);

  const handleLogOut = async () => {
    try {
      await logout();
      dispatch(clearCart());
      router.reload();
    } catch (err) {}
  };

  return (
    <div
      className="rounded-2xl bg-white shadow-sm flex flex-col 
        justify-start p-6 space-y-4"
    >
      {!show || isLoading || isIdle || (isLoggedIn && !result.isSuccess) ? (
        <div className="space-y-2">
          <div className={`${styles.phgradient} h-6 rounded-md`} />
          <div className={`${styles.phgradient} h-6 rounded-md`} />
          <div className={`${styles.phgradient} h-6 rounded-md`} />
        </div>
      ) : isLoggedIn && result.isSuccess ? (
        <section className="space-y-4">
          <div className="font-semibold">
            ¡Bienvenido{" "}
            <span className="text-primary">{result.data.firstName}</span>!
          </div>
          <div className="font-semibold">Últimas ordenes</div>
          {result.data.tickets.length > 0
            ? result.data.tickets.map((ticket) => (
                <OrderCard key={ticket.id} {...ticket} />
              ))
            : "No tienes ordenes"}
        </section>
      ) : (
        <>
          <div className="font-semibold">
            ¡
            <span className="text-primary decoration-2 underline">
              Inicia sesión
            </span>{" "}
            o{" "}
            <span className="text-primary decoration-2 underline">
              Registrate
            </span>{" "}
            para rastrear todas tus ordenes!
          </div>
          <div className="text-sm">No tienes ninguna orden activa</div>
        </>
      )}
    </div>
  );
};

export default UserHeader;
