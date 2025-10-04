import { ITaskManager } from "./ITaskManager";
import { Task } from "./Task";

class TaskManager implements ITaskManager {
	private tasks: Array<Task>;

    constructor() {
        this.tasks = new Array<Task>();
    }

	public tick() {
		this.tasks.forEach((task) => {
			task.tick();

			if (!task.shouldExecute()) {
                return;
            }

			task.execute();
			task.reset();

			if (!task.loop) {
				this.tasks = this.tasks.filter(t => t !== task);
			}
		});
	}

	public remove(name: string) {
		this.tasks = this.tasks.filter(t => t.name !== name);
	}

	public add(task: Task) {
		this.tasks.push(task);
		task.onCreate();
	}

	public reset() {
		this.tasks.forEach((task) => task.reset());
	}
}

export const createTaskManager = () => new TaskManager();