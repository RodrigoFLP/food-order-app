import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsIdle, selectIsLoggedIn, selectIsLoading, selectIsError, selectUser } from '../../store'

import styles from '../Placeholder.module.css'



export const UserHeader: FC = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isLoading = useAppSelector(selectIsLoading);
    const isIdle = useAppSelector(selectIsIdle);

    const user = useAppSelector(selectUser);

    return (
        <div className="rounded-2xl bg-white shadow-sm flex flex-col 
        justify-start p-6 md:space-y-2 h-40 md:h-full">
            {!show || isLoading || isIdle ? <div className="space-y-2">
                <div className={`${styles.phgradient} h-6 rounded-md`} />
                <div className={`${styles.phgradient} h-6 rounded-md`} />
                <div className={`${styles.phgradient} h-6 rounded-md`} />
            </div> :
                isLoggedIn ?
                    <>
                        <div className="font-semibold">
                            ¡Bienvenido <span className="text-primary">{user.email}</span>!
                        </div>
                    </>
                    : <>
                        <div className="font-semibold">
                            ¡<span className="text-primary underline decoration-wavy">Inicia sesión</span> para rastrear todas tus ordenes!
                        </div>
                        <div className="text-sm">
                            No tienes ninguna orden activa
                        </div>
                    </>}

        </div>
    )
}

export default UserHeader;