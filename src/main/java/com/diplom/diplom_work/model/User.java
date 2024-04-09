package com.diplom.diplom_work.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
import java.util.HashSet;
import java.util.Set;

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


    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(
            name = "user_event",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User other = (User) o;
        return id != null && id.equals(other.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void addEvent(Event event) {
        events.add(event);
        event.getUsers().add(this);
    }

    public void removeEvent(Event event) {
        events.remove(event);
        event.getUsers().remove(this);
    }

}


