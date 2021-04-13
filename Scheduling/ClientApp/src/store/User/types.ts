
export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export type UserData = { email: string, password: string, name: string,
	surname: string, position: string, department: string, permissions: Array<string>} | null;

