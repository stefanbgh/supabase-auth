import { FC } from "react";

interface IProps {
	name: string;
}

const User: FC<IProps> = ({ name }): JSX.Element => <div>{name}</div>;

export default User;
