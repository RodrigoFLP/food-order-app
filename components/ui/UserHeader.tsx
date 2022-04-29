import { FC } from "react";


export const UserHeader: FC = () => {

    return (
        <div className="rounded-2xl bg-shade flex flex-col justify-center p-4 md:space-y-2 md:w-2/5">
            <div className="font-semibold">
                Bievenido usuario
            </div>
            <div>
                No tienes ninguna orden activa
            </div>
        </div>
    )
}

export default UserHeader;