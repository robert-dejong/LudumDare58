import { Task } from "./Task";

export interface ITaskManager {
	tick(): void;
	remove(name: string): void;
	add(task: Task): void;
	reset(): void;
	clear(): void;
}