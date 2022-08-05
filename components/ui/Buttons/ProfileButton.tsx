import Link from "next/link";
import { useRouter } from "next/router";
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "react-feather";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../services/api";
import { clearCart, selectIsLoggedIn, selectUser } from "../../../store";
import { useAppSelector } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";

export const ProfileButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { firstName } = useAppSelector(selectUser);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = async () => {
    try {
      await logout();
      dispatch(clearCart());
      router.reload();
    } catch (err) {}
  };

  return (
    <>
      <div className="relative">
        <button
          className={`bg-white h-8 w-8 rounded-full border
        active:scale-90 hover:bg-gray-200 transition-all sm:w-40
        flex items-center justify-center p-2 space-x-1 text-sm`}
          onClick={() => {
            isLoggedIn ? setShowMenu((prev) => !prev) : router.push("/login");
          }}
        >
          <User height={18} color="black" />
          <div className="hidden sm:block">
            {isClient
              ? isLoggedIn
                ? "Ver perfil"
                : "Inicia/registrate"
              : "Cargando"}
          </div>
        </button>
        {showMenu && (
          <>
            <div
              className="absolute bg-white w-48 animate-opacityin
                right-0 top-10 py-2 rounded-xl shadow-md text-sm  z-20"
            >
              <Link href="/profile/orders">
                <a className="p-2 px-4 hover:bg-shade cursor-pointer w-full block">
                  Ver ordenes
                </a>
              </Link>
              <Link href="/profile">
                <a className="p-2 px-4 hover:bg-shade cursor-pointer w-full block">
                  Ver perfil
                </a>
              </Link>
              <a
                className="p-2 px-4 hover:bg-shade cursor-pointer w-full block"
                onClick={handleLogOut}
              >
                Cerrar Sesión
              </a>
            </div>
          </>
        )}
      </div>
      {showMenu && (
        <>
          <div
            className="w-full h-screen absolute top-0 left-0 z-10"
            onClick={() => setShowMenu(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default ProfileButton;
