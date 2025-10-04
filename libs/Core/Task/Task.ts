export abstract class Task {
	public readonly name?: string;
    public readonly loop: boolean;
    
    private readonly initialTicks: number;
    
	private ticks: number;

	public abstract execute(): void;

	constructor(ticks: number, loop = false, name?: string) {
        this.initialTicks = ticks;
		this.ticks = ticks;
        this.loop = loop;
        this.name = name;
	}

	public onCreate(): void {

	}

    public shouldExecute = (): boolean => this.ticks <= 0;
    public reset = (): void => { this.ticks = this.initialTicks };
	public tick = (): void => { this.ticks-- };
}
