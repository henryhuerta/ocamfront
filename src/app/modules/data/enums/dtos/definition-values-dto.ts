export class DefinitionValuesDto {
  text: string;
  value: any;

  constructor(text?: string, value?: any) {
    this.text = text ?? '';
    this.value = value;
  }
}
