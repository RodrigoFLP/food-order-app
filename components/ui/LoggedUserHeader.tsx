import { stringify } from "querystring";
import { FC } from "react";

// import { useProfileQuery } from "../../services/auth";

export const LoggedUserHeader: FC = () => {

    // const { data, isFetching, isLoading, isUninitialized } = useProfileQuery()


    return (
        <div>
            {/* {isFetching || isLoading || isUninitialized ?
                'cargando' :
                <div>¡Bienvenido {data.firstName}!</div>} */}
        </div>
    );
}


export default LoggedUserHeader;