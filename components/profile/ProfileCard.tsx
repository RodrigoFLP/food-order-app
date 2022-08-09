import { FC } from "react";
import { Calendar, Mail, Phone } from "react-feather";

interface Props {
  firstName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
}

export const ProfileCard: FC<Props> = ({
  firstName,
  email,
  phoneNumber,
  birthDate,
}) => {
  return (
    <div className="rounded-xl bg-white border p-4 animate-opacityin">
      <h1 className="font-semibold">¡Bienvenido/a {firstName}!</h1>
      <div className="pt-2 text-sm space-y-1 ">
        <div className="flex items-center space-x-2">
          <div>
            <Phone size={14} />
          </div>
          <div>{phoneNumber}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <Mail size={14} />
          </div>
          <div>{email}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <Calendar size={14} />
          </div>
          <div>{`${birthDate}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
