import { FC } from "react";


export const UserHeader: FC = () => {

    return (
        <div className="rounded-2xl bg-white shadow-sm flex flex-col 
        justify-start p-6 md:space-y-2 h-full">
            <div className="font-semibold">
                ¡<span className="text-primary underline decoration-wavy">Inicia sesión</span> para rastrear todas tus ordenes!
            </div>
            <div className="text-sm">
                No tienes ninguna orden activa
            </div>
        </div>
    )
}

export default UserHeader;