package com.diplom.diplom_work.service;

import com.diplom.diplom_work.exceptions.AlreadyExistsException;
import com.diplom.diplom_work.exceptions.UserNotFoundException;
import com.diplom.diplom_work.model.Role;
import com.diplom.diplom_work.model.User;
import com.diplom.diplom_work.model.dto.UserDto;
import com.diplom.diplom_work.model.dto.adapter.UserUpdateDtoAdapter;
import com.diplom.diplom_work.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService implements ServiceUpdateValidation {
    private final UserRepository userRepository;
    private final UserUpdateDtoAdapter userUpdateDtoAdapter;

    User userFromDb;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {

        return userRepository.findById(userId).orElseThrow();
    }

    public User getUser(String username) {

        return userRepository.findByUsername(username);
    }

    public User updateUser(Long userId, UserDto userDto) {
        User updatedUser = userUpdateDtoAdapter.updateUserFromDto(getUserById(userId), userDto);
        return userRepository.save(updatedUser);
    }

    public User createUser(User user) {
        boolean ifUsernameExists = getAllUsers().stream().anyMatch(userFromList -> userFromList.getUsername().equals(user.getUsername()));
        if (ifUsernameExists) throw new AlreadyExistsException("Such user already exists");

        user.setPassword(user.getPassword());
        user.setRole(Role.ROLE_USER);
        return userRepository.save(user);
    }

    public User createAdmin(User user) {
        boolean ifUsernameExists = getAllUsers().stream().anyMatch(userFromList -> userFromList.getUsername().equals(user.getUsername()));
        if (ifUsernameExists) throw new AlreadyExistsException("Such admin already exists");

        user.setPassword(user.getPassword());
        user.setRole(Role.ROLE_ADMIN);
        return userRepository.save(user);
    }

    @Override
    public boolean checkEmail(UserDto userDto) {
        return userDto.getEmail() != null &&
                !userDto.getEmail().equals(userFromDb.getEmail()) &&
                userRepository.existsByEmail(userFromDb.getEmail());
    }

    @Override
    public boolean checkUsername(UserDto userDto) {
        return userDto.getUsername() != null &&
                !userDto.getUsername().equals(userFromDb.getUsername()) &&
                userRepository.existsByUsername(userFromDb.getUsername());
    }

    @Override
    public boolean checkPassword(UserDto userDto) {
        return !userDto.getPassword().equals(userFromDb.getPassword());
    }

    public void deleteUser(final Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }
}
