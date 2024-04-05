package com.diplom.diplom_work.model.dto.adapter;

import com.diplom.diplom_work.model.User;
import com.diplom.diplom_work.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUpdateDtoAdapter {
    public User updateUserFromDto(User user, UserDto dto) {
        return User.builder()
                .id(user.getId())
                .username(dto.getUsername() != null ? dto.getUsername() : user.getUsername())
                .password(dto.getPassword() != null ? dto.getPassword() : user.getPassword())
                .firstName(dto.getFirstName() != null ? dto.getFirstName() : user.getFirstName())
                .lastName(dto.getLastName() != null ? dto.getLastName() : user.getLastName())
                .email(dto.getEmail() != null ? dto.getEmail() : user.getEmail())
                .dateOfBirth(dto.getDateOfBirth() != null ? dto.getDateOfBirth() : user.getDateOfBirth())
                .role(dto.getRole() != null ? dto.getRole() : user.getRole())
                .build();
    }
}
