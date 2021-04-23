
export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export interface Permission {
	name: string
}
export interface ComputedProps {
	permissions: Array<Permission>
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

