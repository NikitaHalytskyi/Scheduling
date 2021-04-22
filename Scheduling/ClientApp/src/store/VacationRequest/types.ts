export interface VacationRequestState {
	logged: boolean,
	token: string | null,
	requestHistory: Array<VacationRequest>
}

export type VacationRequest = {
	id: number,
	startDate: Date, 
	finishDate: Date,
	status: string,
	comment: string,
}