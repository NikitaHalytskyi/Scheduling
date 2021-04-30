export interface TimerHistoryState {
	logged: boolean,
	token: string | null,
	timerHistory: Array<TimerType>,
	editValue: {
		editId: number,
		startTime: Date,
		finishTime: Date,
    }
}

export type TimerType = {
	id: number,
	startTime: Date,
	finishTime: Date,
}