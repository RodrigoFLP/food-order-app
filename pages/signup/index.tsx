import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Lock, Mail, Map, MapPin, Smartphone, User } from "react-feather";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../../components/layouts";
import { BarButton, DateInput, Input, LocationModal, SelectInput } from "../../components/ui";

import { validationSignup } from '../../utils/schemas'


interface IFormInput {
    firstName: string;
    lastname: string;
    phoneNumber: string;
    birthDate: Date;
    email: string;
    password: string;
    state: string;
    city: string;
    locality: string;
    address: string;
    addressDetail: string;
}


const useYupValidationResolver = (validationSchema: typeof validationSignup) =>
    useCallback<Resolver<IFormInput>>(
        async (data) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false
                });

                return {
                    values,
                    errors: {}
                };
            } catch (errors: any) {
                console.log(data, errors);
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: any) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message
                            }
                        }),
                        {}
                    )
                };
            }
        },
        [validationSchema]
    );


const SignupPage: NextPage = () => {


    const router = useRouter();

    const resolver = useYupValidationResolver(validationSignup);

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({ resolver });

    const [showModal, setShowModal] = useState(false);


    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        router.push('/');
        console.log(data);


    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    const handleClick = () => {
        setShowModal(true);
    }


    return (
        <Layout title="Registro">
            <LocationModal show={showModal} handleClose={handleCloseModal} />
            <div className="flex flex-col items-center space-y-4">
                <p className=" sm:w-3/4 md:1/2 bg-shade m-4 p-4 rounded-lg text-sm">
                    Si tienes una cuenta en Panchos Villa, podrás revisar tus pedidos
                    , direcciones de entrega. ¡Así agilizarás el proceso de compra y
                    estarás comiendo tus tacos antes de lo esperado!
                </p>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="font-semibold text-center pb-4 uppercase">
                        Información personal
                    </h2>
                    <hr />
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-end">

                        <Input label="Nombres"
                            register={register('firstName', { required: true })}
                            error={errors.firstName ? true : false}
                            errorMessage={errors.firstName?.message}
                            Icon={User} />
                        <Input label="Apellidos"
                            register={register('lastname', { required: true })}
                            error={errors.lastname ? true : false}
                            errorMessage={errors.lastname?.message}

                            Icon={User} />
                        <Input label="Teléfono"
                            type='tel'
                            register={register('phoneNumber', { required: true })}
                            error={errors.phoneNumber ? true : false}
                            errorMessage={errors.phoneNumber?.message}
                            Icon={Smartphone} />
                        <DateInput label="Fecha de nacimiento"
                            register={register('birthDate', { required: true })}
                            errorMessage={'Ingresa una fecha válida'}
                            error={errors.birthDate ? true : false} />
                        <Input label="Correo"
                            type='email'
                            Icon={Mail}
                            register={register('email', { required: true })}
                            errorMessage={errors.email?.message}
                            error={errors.email ? true : false} />
                        <Input label="Contraseña"
                            Icon={Lock}
                            type='password'
                            register={register('password', { required: true })}
                            errorMessage={errors.password?.message}
                            error={errors.password ? true : false} />
                    </section>
                    <h2 className="font-semibold text-center pt-8 pb-4 uppercase">
                        Dirección principal
                    </h2>
                    <hr />
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-end">

                        <SelectInput label="Departamento"
                            register={register('state', { required: true })}
                            errorMessage={errors.state?.message}
                            error={errors.state ? true : false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <SelectInput label="Municipio"
                            register={register('city', { required: true })}
                            errorMessage={errors.city?.message}
                            error={errors.city ? true : false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <SelectInput label="Colonia"
                            register={register('locality', { required: true })}
                            errorMessage={errors.locality?.message}
                            error={errors.locality ? true : false}
                            options={['Santa Ana', 'San Salvador']}
                            initialValue={1}
                            setValue={() => { }} />
                        <Input label="Dirección"
                            Icon={Map}
                            register={register('address', { required: true })}
                            errorMessage={errors.address?.message}
                            error={errors.address ? true : false} />
                        <Input label="No. de casa o apto."
                            Icon={MapPin}
                            register={register('addressDetail', { required: true })}
                            errorMessage={errors.addressDetail?.message}
                            error={errors.addressDetail ? true : false} />
                        <BarButton type='button'
                            handleClick={handleClick}
                            Icon={MapPin} >
                            Seleccionar ubicación
                        </BarButton>


                    </section>
                    <div className="pt-8">
                        <BarButton>
                            Registrarse
                        </BarButton>
                    </div>

                </form>


            </div>
        </Layout>
    );
}

export default SignupPage;