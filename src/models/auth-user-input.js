export default class AuthUserInput {
  constructor(name, type, label, helpText, validation) {
    this.name = name;
    this.type = type;
    this.helpText = helpText;
    this.label = label;
    this.validation = validation;
  }
}
