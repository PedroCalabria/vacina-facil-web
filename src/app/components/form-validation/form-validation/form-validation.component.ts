import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorMessages } from '../../../type/error';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.scss',
})
export class FormValidationComponent {
  @Input() control: AbstractControl | null = null;

  showErrors() {
    return this.control && this.control.touched && this.control.errors;
  }

  showErrorMessages() {
    if (this.control && this.control?.errors) {
      const errors = this.control?.errors;

      const errorsArray = Object.keys(errors).map((key) =>
        this.messages(key, errors[key])
      );

      return errorsArray;
    }
    return [];
  }

  messages(errorKey: string, errorValue: ValidationErrors) {
    const messages: ErrorMessages = {
      required: 'O campo é obrigatório',
      minlength: `O campo precisa ter no minimo ${errorValue['requiredLength']} caracteres`,
      maxlength: `O campo precisa ter no maximo ${errorValue['requiredLength']} caracteres`,
      email: `O email é inválido`,
      invalidDate: 'A data informada está inválida',
    };

    return messages[errorKey];
  }
}
