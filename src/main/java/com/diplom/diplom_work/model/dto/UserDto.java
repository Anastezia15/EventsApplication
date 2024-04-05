package com.diplom.diplom_work.model.dto;

import com.diplom.diplom_work.model.Role;
import com.diplom.diplom_work.model.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;

@Data
@RequiredArgsConstructor
public class UserDto {

    @Size(min = 3, message = "Username must be at least 3 characters")
    @Size(max = 50, message = "Username must be no more than 50 characters")
    private String username;

    @Size(min = 6, message = "Password must be at least 6 characters")
    @Size(max = 255, message = "Password must be no more than 255 characters")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).+$", message = "Password must have at least 1 number and 1 letter")
    private String password;

    @Email(message = "Provide a valid email")
    private String email;

    @Size(min = 3, message = "First name must be at least 3 characters")
    @Size(max = 50, message = "First name must be no more than 50 characters")
    private String firstName;

    @Size(min = 3, message = "Last name must be at least 3 characters")
    @Size(max = 50, message = "Last name must be no more than 50 characters")
    private String lastName;

    @Past(message = "Birth date must be in the past")
    private Date dateOfBirth;

    private Role role;

    public UserDto(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.dateOfBirth = user.getDateOfBirth();
        this.role = user.getRole();
    }
}
