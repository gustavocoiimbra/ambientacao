package br.ufg.inf.onboarding;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.ufg.inf.onboarding.model.Pessoa;
import br.ufg.inf.onboarding.repository.PessoaRepository;


@SpringBootApplication
public class OnboardingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnboardingApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(PessoaRepository pessoaRepository) {
		return args -> {

			pessoaRepository.deleteAll();
			Pessoa c = new Pessoa();
			c.setNome("Lucas Silva Amaral");
			c.setCpf("06616006107");
			pessoaRepository.save(c);

			Pessoa j = new Pessoa();
			j.setNome("Pedro Souza Silva");
			j.setCpf("86495470100");
			pessoaRepository.save(j);


		}; 
	}
	
}
