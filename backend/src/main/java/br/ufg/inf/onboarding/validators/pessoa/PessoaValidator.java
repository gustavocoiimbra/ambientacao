package br.ufg.inf.onboarding.validators.pessoa;

import br.ufg.inf.onboarding.model.Pessoa;
import br.ufg.inf.onboarding.validators.ValidationUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validacoes comuns as operacoes de inclusao e alteracao de pessoa.
 */
@Component
public class PessoaValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return Pessoa.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors,"cpf", "validator.error.cpf.empty");
        this.rejectIfInvalidCpf(errors,"cpf", "validator.error.cpf.invalid");

        ValidationUtils.rejectIfEmptyOrWhitespace(errors,"nome","validator.error.nome.empty");
        ValidationUtils.rejectIfTextLengthMoreThan(errors,"nome", 200, "validator.error.nome.invalid-size");
    }

    private void rejectIfInvalidCpf(Errors errors, String field, String errorCode) {
        ValidationUtils.rejectIfErrorsOrFieldNameNotSupplied(errors, field);

        String cpf = (String) errors.getFieldValue(field);

        if(!ValidationUtils.cpfValido(cpf)) {
            errors.rejectValue(field, errorCode, null);
        }
    }
}
