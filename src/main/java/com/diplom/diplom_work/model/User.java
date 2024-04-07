package com.diplom.diplom_work.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;

@Entity
@Table(name = "users")
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Basic
    @Column(name = "username", nullable = false, length = 50)
    @NotNull(message = "Provide a username")
    @Size(min = 3, message = "Username must be at least 3 characters")
    @Size(max = 50, message = "Username must be no more than 50 characters")
    private String username;

    @Basic
    @Column(name = "password", nullable = false)
    @NotNull(message = "Provide a password")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Size(max = 255, message = "Password must be no more than 255 characters")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).+$", message = "Password must have at least 1 number and 1 letter")
    private String password;

    @Basic
    @Column(name = "email", nullable = false, length = 100)
    @NotNull(message = "Provide an email")
    @Email(message = "Provide a valid email")
    private String email;

    @Basic
    @Column(name = "first_name", length = 50)
    @Size(min = 3, message = "First name must be at least 3 characters")
    @Size(max = 50, message = "First name must be no more than 50 characters")
    private String firstName;

    @Basic
    @Column(name = "last_name", length = 50)
    @Size(min = 3, message = "Last name must be at least 3 characters")
    @Size(max = 50, message = "Last name must be no more than 50 characters")
    private String lastName;

    @Basic
    @Column(name = "date_of_birth")
    @Past(message = "Birth date must be in the past")
    private Date dateOfBirth;

    @Basic
    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    private Role role;

}


