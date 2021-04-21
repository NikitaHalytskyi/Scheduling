<<<<<<< HEAD
﻿
export interface UserManagementState {
	token: string | null,
	users: UserData[]
}

export interface ComputedProps {
	permissions: Array<string>
}

export type UserData = {
	email: string,
	password: string,
	name: string,
	surname: string,
	position: string,
	department: string,
	computedProps: ComputedProps
} | null;
=======
import { UserData } from "../User/types";

export interface UserManagementState {
    users: Array<UserData>
}
>>>>>>> a18d6265365a404de2cd50be57544c31a08add18
