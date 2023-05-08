package br.ufg.inf.onboarding.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.inf.onboarding.model.Pessoa;
import br.ufg.inf.onboarding.repository.PessoaRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/pessoas")
@AllArgsConstructor
public class PessoaController {

    private final PessoaRepository pessoaRepository;
    
    @GetMapping
    public List<Pessoa> list() {
        return (List<Pessoa>) pessoaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> findByPessoa(@PathVariable("id") Integer id) {
        return pessoaRepository.findById(id).map(
            record -> ResponseEntity.ok().body(record)
        ).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Pessoa create(@RequestBody Pessoa record) {
        return pessoaRepository.save(record);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<Pessoa> update(@PathVariable Integer id, @RequestBody Pessoa record) {
        return pessoaRepository.findById(id).map(
            recordFoud -> {
                recordFoud.setNome(record.getNome());
                recordFoud.setCpf(record.getCpf());
                Pessoa updatedPessoa = pessoaRepository.save(recordFoud);
                return ResponseEntity.ok().body(updatedPessoa);
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        return pessoaRepository.findById(id).map(
            recordFoud -> {
                pessoaRepository.delete(recordFoud);
                return ResponseEntity.noContent().build();
            }).orElse(ResponseEntity.notFound().build());
    }
    
}
