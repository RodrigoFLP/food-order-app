import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { User, Lock } from "react-feather";
import { Layout } from "../../components/layouts";
import { BarButton, Input } from "../../components/ui";


const LoginPage: NextPage = () => {

    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('hola');
        router.push('/');
    }

    return (
        <Layout title="Ingresar">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="font-bold text-xl">
                    Ingresar
                </h1>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <Input label="Usuario" error={false} Icon={User} />

                    <Input label="Contraseña" error={false} Icon={Lock} />
                    <div className="text-xs text-right underline decoration-2 decoration-primary pb-2">¿Has olvidado tu contraseña?</div>

                    <BarButton title="Ingresar" type='submit' />


                </form>


            </div>
            <section className="flex flex-col items-center pt-8">
                <Link href="/signup" passHref>
                    <button className="flex items-center flex-col p-4 
                rounded-xl bg-slate-100 cursor-pointer peer group active:scale-95">
                        <h1 className="font-extrabold peer">¿Aún no tienes cuenta?</h1>
                        <h1 className="underline decoration-2 decoration-primary 
                font-semibold text-primary group-hover:text-secondary group-hover:decoration-secondary">
                            Registrate
                        </h1>
                    </button>
                </Link>
            </section>
        </Layout>
    )
}

export default LoginPage;