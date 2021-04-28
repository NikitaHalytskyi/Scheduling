export interface TimerHistoryState {
	logged: boolean,
	token: string | null,
	timerHistory: Array<TimerType>
}

export type TimerType = {
	id: number,
	DateTimeStart: Date, 
	DateTimeFinish: Date,
	Time: string
}