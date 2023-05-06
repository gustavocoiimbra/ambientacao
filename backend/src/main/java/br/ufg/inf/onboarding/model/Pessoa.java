package br.ufg.inf.onboarding.model;

import lombok.Data;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Entity
@Table(name="PESSOA")
public class Pessoa {
    @Id
    @GeneratedValue
    @Column(updatable = false)
    private Integer id;

    @JsonProperty("name")
    private String nome;

    private String cpf;
}
