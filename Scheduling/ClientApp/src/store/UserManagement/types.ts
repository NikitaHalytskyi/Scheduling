
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
