package com.diplom.diplom_work.service;

import com.diplom.diplom_work.model.dto.UserDto;

interface ServiceUpdateValidation {
    boolean checkEmail(UserDto userDto);
    boolean checkUsername(UserDto userDto);
    boolean checkPassword(UserDto userDto);
}
