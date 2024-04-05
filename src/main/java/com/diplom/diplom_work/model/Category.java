package com.diplom.diplom_work.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@RequiredArgsConstructor
public class Category {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Basic
    @Column(name = "name", nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany
    private Set<Event> events = new HashSet<>();
}
