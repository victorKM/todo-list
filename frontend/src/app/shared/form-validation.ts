export class FormValidations {
  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const config: { [key: string]: any } = {
      required: `${fieldName} is required.`,
      minlength: `${fieldName} need minimum ${validatorValue.requiredLength} characters`,
      maxlength: `${fieldName} have maximum ${validatorValue.requiredLength} characters`,
    };

    return config[validatorName];
  }
}
