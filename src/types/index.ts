export interface ITag {
  value: string;
  label: string;
}

export interface INoteData {
  title: string;
  markdown: string;
  tags: ITag[];
}

export interface INote extends INoteData {
  id: string;
}
