export interface TimerHistoryState {
	logged: boolean,
	token: string | null,
	timerHistory: Array<TimerType>,
	date,
}

export type TimerType = {
	id: number,
	startTime: string,
	finishTime: Date,
}