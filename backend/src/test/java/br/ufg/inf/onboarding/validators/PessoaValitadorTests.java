package br.ufg.inf.onboarding.validators;

import br.ufg.inf.onboarding.builders.DataFaker;
import br.ufg.inf.onboarding.builders.PessoaBuilder;
import br.ufg.inf.onboarding.model.Pessoa;
import br.ufg.inf.onboarding.validators.pessoa.PessoaValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

@SpringBootTest
public class PessoaValitadorTests {

    @Autowired
    private PessoaValidator pessoaValidator;

    @Test
    public void testCriarPessoaCPFNaoInformado(){
        Pessoa pessoa = PessoaBuilder.init().comId().build();

        Errors errors = new BeanPropertyBindingResult(pessoa, "pessoa" );
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals( 2, errors.getFieldErrorCount("cpf"));
        Assertions.assertEquals(1, errors.getFieldErrors("cpf").stream().filter(e -> e.getCode().matches("validator.error.cpf.empty")).count());
        Assertions.assertEquals(1, errors.getFieldErrors("cpf").stream().filter(e -> e.getCode().matches("validator.error.cpf.invalid")).count());
    }

    @Test
    public void testCriarPessoaCPFInformadoInvalido(){
        Pessoa pessoa = PessoaBuilder.init().comId().build();
        pessoa.setCpf("123");

        Errors errors = new BeanPropertyBindingResult(pessoa, "pessoa" );
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals( 1, errors.getFieldErrorCount("cpf"));
        Assertions.assertEquals(1, errors.getFieldErrors("cpf").stream().filter(e -> e.getCode().matches("validator.error.cpf.invalid")).count());
    }

    @Test
    public void testCriarPessoaCPFValido(){

        Pessoa pessoa = PessoaBuilder.init().comCpf().comId().build();

        Errors errors = new BeanPropertyBindingResult(pessoa,"pessoa");
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals(0, errors.getFieldErrorCount("cpf"));
    }

    @Test
    public void testCriarPessoaNomeNaoInformado(){
        Pessoa pessoa = PessoaBuilder.init().comId().comCpf().build();
        Errors errors = new BeanPropertyBindingResult(pessoa,"pessoa");
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals( 2, errors.getFieldErrorCount("nome"));
        Assertions.assertEquals(1, errors.getFieldErrors("nome").stream().filter(e -> e.getCode().matches("validator.error.nome.empty")).count());
        Assertions.assertEquals(1, errors.getFieldErrors("nome").stream().filter(e -> e.getCode().matches("validator.error.nome.invalid-size")).count());
    }

    @Test
    public void testCriarPessoaNomeInformadoInvalido(){
        Pessoa pessoa = PessoaBuilder.init().comId().comCpf().build();
        pessoa.setNome(DataFaker.instance().lorem().characters(201));

        Errors errors = new BeanPropertyBindingResult(pessoa,"pessoa");
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals( 1, errors.getFieldErrorCount("nome"));
        Assertions.assertEquals(1, errors.getFieldErrors("nome").stream().filter(e -> e.getCode().matches("validator.error.nome.invalid-size")).count());
    }

    @Test
    public void testCriarPessoaNomeInformadoValido(){
        Pessoa pessoa = PessoaBuilder.init().comId().comCpf().build();
        pessoa.setNome(DataFaker.instance().lorem().characters(200));

        Errors errors = new BeanPropertyBindingResult(pessoa,"pessoa");
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals( 0, errors.getFieldErrorCount("nome"));
    }

    @Test
    public void testCriarPessoaOk(){
        Pessoa pessoa = PessoaBuilder.init().comId().comNome().comCpf().build();

        Errors errors = new BeanPropertyBindingResult(pessoa, "pessoa");
        this.pessoaValidator.validate(pessoa,errors);

        Assertions.assertEquals(0, errors.getErrorCount());
    }
}
