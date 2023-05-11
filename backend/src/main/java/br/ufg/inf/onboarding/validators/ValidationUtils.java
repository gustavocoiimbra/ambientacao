package br.ufg.inf.onboarding.validators;

import org.springframework.util.Assert;
import org.springframework.validation.Errors;

public abstract class ValidationUtils extends org.springframework.validation.ValidationUtils {

    public static void rejectIfIsNotEmpty(Errors errors, String field, String errorCode){
        rejectIfErrorsOrFieldNameNotSupplied(errors,field);

        Object value = errors.getFieldValue(field);

        if (value != null) {
            errors.rejectValue(field, errorCode);
        }
    }

    public static void rejectIfIsNotEmpty(Errors errors)
    {
        rejectIfIsNotEmpty(errors,"id","validator.error.id.not-empty");
    }

    public static void rejectIfIdIsEmpty(Errors errors){
        rejectIfEmptyOrWhitespace(errors,"id","validator.error.id.empty");
    }

    public static void rejectIfTextLengthMoreThan(Errors errors, String field, int expectedLenght, String errorCode) {
        rejectIfErrorsOrFieldNameNotSupplied(errors,field);

        String value = (String) errors.getFieldValue(field);

        rejectIfEmpty(errors, field, errorCode);

        if (value != null && value.length() > expectedLenght) {
            errors.rejectValue(field, errorCode, null);
        }
    }

    public static void rejectIfTextLengthLessThan(Errors errors, String field, int expectedLenght, String errorCode) {
        rejectIfErrorsOrFieldNameNotSupplied(errors,field);

        String value = (String) errors.getFieldValue(field);

        if(value == null)
        {
            return;
        }

        if (value != null && value.length() < expectedLenght) {
            errors.rejectValue(field, errorCode, null);
        }
    }


    /**
     * Verifica se a validação possui os dados mínimos para ser realizada.
     * Essa é uma validação interna.
     * @param errors Lista de erros para bind.
     * @param field Campo para ser invalidado.
     */
    public static void rejectIfErrorsOrFieldNameNotSupplied(Errors errors, String field) {
        Assert.notNull(errors, "Errors object must not be null");
        Assert.hasText(field, "Field name must contain at least one non-whitespace character");
    }

    /**
     * Valida o número do documento CPF.
     * @param cpf Número do CPF para validação.
     * @return True caso válido, falso caso contrário.
     */
    public static Boolean cpfValido(String cpf) {

        if(cpf == null || cpf.isEmpty())
        {
            return false;
        }

        cpf = cpf.replace(".", "");
        cpf = cpf.replace("-", "");

        try{
            Long.parseLong(cpf);
        } catch(NumberFormatException e){
            return false;
        }

        int d1, d2;
        int digito1, digito2, resto;
        int digitoCPF;
        String nDigResult;

        d1 = d2 = 0;
        digito1 = digito2 = resto = 0;

        for (int nCount = 1; nCount < cpf.length() - 1; nCount++) {
            digitoCPF = Integer.valueOf(cpf.substring(nCount - 1, nCount)).intValue();
            d1 = d1 + (11 - nCount) * digitoCPF;
            d2 = d2 + (12 - nCount) * digitoCPF;
        };

        resto = (d1 % 11);

        if (resto < 2)
            digito1 = 0;
        else
            digito1 = 11 - resto;

        d2 += 2 * digito1;

        resto = (d2 % 11);

        if (resto < 2)
            digito2 = 0;
        else
            digito2 = 11 - resto;

        String nDigVerific = cpf.substring(cpf.length() - 2, cpf.length());

        nDigResult = String.valueOf(digito1) + String.valueOf(digito2);

        return nDigVerific.equals(nDigResult);
    }
}
