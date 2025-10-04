import { Task } from "../../libs/Core/Task/Task";

export class TestTask extends Task {

    constructor(ticks: number) {
        super(ticks);
    }

    public execute(): void {
        console.log('EXECUTED TASK!');
    }
}