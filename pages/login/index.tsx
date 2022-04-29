import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { User, Lock } from "react-feather";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../../components/layouts";
import { BarButton, Input } from "../../components/ui";
import { validationLogin } from '../../utils/schemas';

interface IFormInput {
    email: string;
    password: string;
}

const useYupValidationResolver = (validationSchema: typeof validationLogin) =>
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
        }
        , [validationSchema]);


const LoginPage: NextPage = () => {

    const resolver = useYupValidationResolver(validationLogin);

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({ resolver });

    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    }


    return (
        <Layout title="Ingresar">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="font-bold text-xl">
                    Ingresar
                </h1>
                <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>

                    <Input register={register("email", { required: true })}
                        label="Correo electrónico"
                        error={errors.email ? true : false}
                        errorMessage={errors.email?.message}
                        Icon={User} />
                    <Input register={register("password", { required: true })}
                        label="Contraseña"
                        type='password'
                        error={errors.password ? true : false}
                        errorMessage={errors.password?.message}
                        Icon={Lock} />
                    <div className="text-xs text-right underline 
                    decoration-2 decoration-primary pb-2">
                        <Link href="/login/forgot">
                            <a className="hover:text-primary">
                                ¿Has olvidado tu contraseña?
                            </a>
                        </Link>
                    </div>
                    <BarButton type="submit">
                        Ingresar
                    </BarButton>

                </form>


            </div>
            <section className="flex flex-col items-center pt-8">
                <Link href="/signup" passHref>
                    <button className="flex items-center flex-col p-4 
                rounded-xl bg-slate-100 cursor-pointer peer group active:scale-95">
                        <h1 className="font-extrabold peer">¿Aún no tienes cuenta?</h1>
                        <h1 className="underline decoration-2 decoration-primary
                         font-semibold text-primary group-hover:text-secondary 
                         group-hover:decoration-secondary">
                            Registrate
                        </h1>
                    </button>
                </Link>
            </section>
        </Layout>
    )
}

export default LoginPage;