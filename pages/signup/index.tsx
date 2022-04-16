import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { Lock, Mail, Map, MapPin, Smartphone, User } from "react-feather";
import { Layout } from "../../components/layouts";
import { BarButton, Input, LocationModal, SelectInput } from "../../components/ui";


const SignupPage: NextPage = () => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('hola');

    }

    const handleClick = () => {
        setShowModal(true);
    }


    return (
        <Layout title="Registro">
            <LocationModal show={showModal} handleClose={handleClose} />
            <div className="flex flex-col items-center space-y-4">
                <p className=" sm:w-3/4 md:1/2 bg-shade m-4 p-4 rounded-lg text-sm">
                    Si tienes una cuenta en Panchos Villa, podrás revisar tus pedidos
                    , direcciones de entrega. ¡Así agilizarás el proceso de compra y
                    estarás comiendo tus tacos antes de lo esperado!
                </p>
                <form className="" onSubmit={handleSubmit}>
                    <h2 className="font-semibold text-center pb-4 uppercase">
                        Información personal
                    </h2>
                    <hr />
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-end">

                        <Input label="Nombres" error={false} Icon={User} />
                        <Input label="Apellidos" error={false} Icon={User} />
                        <Input label="Teléfono" error={false} Icon={Smartphone} />

                        <div className="flex space-x-2 relative pt-6">

                            <SelectInput label="Día" error={false}
                                options={['1', '2', '3']}
                                initialValue={1}
                                setValue={() => { }} />
                            <SelectInput label="Mes" error={false}
                                options={['Enero', 'Febrero']}
                                initialValue={1}
                                setValue={() => { }} />
                            <SelectInput label="Año" error={false}
                                options={['1990', '1991']}
                                initialValue={1}
                                setValue={() => { }} />
                            <label className="text-xs absolute top-0">
                                Fecha de nacimiento
                            </label>
                        </div>
                        <Input label="Correo" error={false} Icon={Mail} />
                        <Input label="Contraseña" error={false} Icon={Lock} />
                    </section>
                    <h2 className="font-semibold text-center pt-8 pb-4 uppercase">
                        Dirección principal
                    </h2>
                    <hr />
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">

                        <SelectInput label="Departamento" error={false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <SelectInput label="Municipio" error={false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <SelectInput label="Colonia" error={false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <Input label="Dirección" error={false} Icon={Map} />
                        <Input label="No. de casa o apto." error={false} Icon={MapPin} />
                        <BarButton title="Seleccionar ubicación" type='button' handleClick={handleClick} />
                    </section>
                    <div className="pt-8">
                        <BarButton title="Registrarse" type='submit' />
                    </div>

                </form>


            </div>
        </Layout>
    );
}

export default SignupPage;