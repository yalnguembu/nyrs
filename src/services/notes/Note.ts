import { NoteSchema } from "../../utils";

export class Note {
  private readonly note: NoteSchema;
  constructor(private readonly data: NoteSchema) {
    this.note = data;
  }

  get ownerId() {
    return this.note.ownerId;
  }
  get title() {
    return this.note.title ?? "";
  }

  get description() {
    return this.note.description ?? "";
  }

  get creationDate() {
    return this.note.creationDate?.toString() ?? "";
  }

  get tags() {
    return this.note.tags;
  }

  details() {
    return {
      ownerId: this.ownerId,
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      tags: this.tags,
    };
  }
}
