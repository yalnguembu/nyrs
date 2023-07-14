import { TagSchema } from "../../utils";

export class Tag {
  private readonly tag: TagSchema;
  constructor(private readonly data: TagSchema) {
    this.tag = data;
  }

  get id() {
    return this.tag._id ?? "";
  }

  get title() {
    return this.tag.title ?? "";
  }

  get description() {
    return this.tag.description ?? "";
  }

  details = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
    };
  };
}
