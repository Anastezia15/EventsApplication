package com.diplom.diplom_work.repository;

import com.diplom.diplom_work.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByUsername(String username);
}

