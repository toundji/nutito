import { Workfield } from "./workfield.model";

export class OperationType {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public workfields?: any[],
    public workField_ids?: any[],
    public workfields_string?: string
  ) {}

  public fromJSON(json: any) {
    this.id = json.id
    this.name = json.name
    this.description = json.description
    this.type = json.type
    this.workfields = json.workfields
    this.workfields_string = this.workfields?.map((workfield) => workfield.name).join(' - ') as string
    return this
  }
}
