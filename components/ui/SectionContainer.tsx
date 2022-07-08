import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  title: string;
}

export const SectionContainer: FC<Props> = ({ children, title }) => {
  return (
    <section className="relative" about={title}>
      <div className="flex justify-between pt-2 items-center pb-4">
        <span className="font-semibold text-lg">{title}</span>
        <Link href="/menu" passHref prefetch={false}>
          <span
            className="font-semibold text-primary text-sm 
                cursor-pointer hover:text-secondary"
          >
            Ver todo
          </span>
        </Link>
      </div>
      {children}
    </section>
  );
};

export default SectionContainer;
