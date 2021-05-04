export interface TimerHistoryState {
	logged: boolean,
	token: string | null,
	timerHistory: Array<TimerType>,
}

export type TimerType = {
	id: number,
	startTime: string,
	finishTime: Date,
}