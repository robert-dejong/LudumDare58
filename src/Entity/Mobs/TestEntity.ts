import { createVariableMobOptions, VariableMobEntity } from "./VariableMobEntity";

export class TestEntity extends VariableMobEntity {

    protected getOptions() {
       return createVariableMobOptions({ name: 'var helloWorld', width: 36 });
    }
}