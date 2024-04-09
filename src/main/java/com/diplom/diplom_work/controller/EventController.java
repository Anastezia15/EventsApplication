package com.diplom.diplom_work.controller;

import com.diplom.diplom_work.model.Event;
import com.diplom.diplom_work.model.User;
import com.diplom.diplom_work.model.dto.EventCreateDto;
import com.diplom.diplom_work.model.dto.EventUpdateDto;
import com.diplom.diplom_work.repository.EventRepository;
import com.diplom.diplom_work.repository.UserRepository;
import com.diplom.diplom_work.service.CategoryService;
import com.diplom.diplom_work.service.EventService;
import com.diplom.diplom_work.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final CategoryService categoryService;

    @GetMapping("/admin")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/creatorId/{creatorId}")
    public ResponseEntity<List<Event>> getEventByCreatorId(@PathVariable Long creatorId) {
        List<Event> events = eventService.getAll().stream().filter(event -> event.getCreatorId().equals(creatorId))
                .toList();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/admin/id/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/user/title/{title}")
    public ResponseEntity<Event> getEventByTitle(@PathVariable String title) {
        Event event = eventService.getEventByTitle(title);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventCreateDto event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.created(URI.create("created")).body(createdEvent);
    }

    @PatchMapping("user/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody EventUpdateDto eventUpdateDto) {
        Event updatedEvent = eventService.updateEvent(id, eventUpdateDto);
        return ResponseEntity.ok(updatedEvent);
    }

    @PostMapping("/user/subscribe/{eventId}/{userId}")
    public ResponseEntity<String> setSubscription(@PathVariable Long eventId, @PathVariable Long userId) {
        Event event = eventService.getEventById(eventId);
        User user = userService.getUserById(userId);
        //event.addUserToList(user);

        eventRepository.save(event);

        return ResponseEntity.ok("Subscription accomplished successfully");
    }

    @GetMapping("/subscribers/{eventId}")
    public ResponseEntity<Set<User>> getEventSubscribers(@PathVariable Long eventId) {
        Set<User> eventSubscribers = eventService.getAllSubscribers(eventId);
        return ResponseEntity.ok(eventSubscribers);
    }

    @GetMapping("/user_subscriptions/{userId}")
    public ResponseEntity<Set<Event>> getUserSubscriptions(@PathVariable Long userId) {
        Set<Event> userSubscriptionsOnEvent = eventService.getAllSubscriptionsOnEvents(userId);
        return ResponseEntity.ok(userSubscriptionsOnEvent);
    }

    @PatchMapping("/unsubscribe/{eventId}/{userId}")
    public ResponseEntity<String> removeSubscription(@PathVariable Long eventId, @PathVariable Long userId) {
        Event event = eventService.getEventById(eventId);
        User user = userService.getUserById(userId);

      //  event.getUserSubscriptionList().remove(user);

        eventRepository.save(event);
        userRepository.save(user);

        return ResponseEntity.ok("Unsubscription accomplished successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.ok().build();
    }
}
