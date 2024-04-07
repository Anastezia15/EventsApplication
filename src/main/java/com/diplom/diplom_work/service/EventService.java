package com.diplom.diplom_work.service;


import com.diplom.diplom_work.exceptions.AlreadyExistsException;
import com.diplom.diplom_work.exceptions.EventNotFoundException;
import com.diplom.diplom_work.exceptions.EventNotValidException;
import com.diplom.diplom_work.model.Event;
import com.diplom.diplom_work.model.User;
import com.diplom.diplom_work.model.dto.EventCreateDto;
import com.diplom.diplom_work.model.dto.EventUpdateDto;
import com.diplom.diplom_work.model.dto.adapter.EventCreateDtoAdapter;
import com.diplom.diplom_work.model.dto.adapter.EventUpdateDtoAdapter;
import com.diplom.diplom_work.repository.CategoryRepository;
import com.diplom.diplom_work.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final EventCreateDtoAdapter eventCreateDtoAdapter;

    private final EventUpdateDtoAdapter eventUpdateDtoAdapter;

    private final CategoryRepository categoryRepository;

    private final UserService userService;

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException(id));
    }

    public Event getEventByTitle(String title) {
        return eventRepository.findByTitle(title).orElseThrow(() -> new EventNotFoundException(title));
    }

    public Event saveEvent(Event event) {
        Event savedEvent;

        try {
            savedEvent = eventRepository.save(event);
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            throw new EventNotValidException("Invalid Event data: " + ex.getMessage());
        }

        return savedEvent;
    }

    public Event getEventByUser(User user) {
        return eventRepository.findByCreatorId(user.getId()).orElseThrow(() -> new EventNotFoundException(user.getId(), 1L));
    }

    public Event createEvent(EventCreateDto eventCreateDto) {
        Event createdEvent = eventCreateDtoAdapter.fromDto(eventCreateDto);

        for (Event event : getAll()) {
            if (eventCreateDto.equals(eventCreateDtoAdapter.toDto(event))) throw new AlreadyExistsException("Such " +
                    "event already exists.");
        }
        createdEvent.setCategory(categoryRepository.findByName(eventCreateDto.getCategory()).orElse(null));
        return eventRepository.save(createdEvent);
    }

    public Event updateEvent(Long eventId, EventUpdateDto eventUpdateDto) {
        Event updatedEvent = eventUpdateDtoAdapter.updateEventFromDto(getEventById(eventId), eventUpdateDto);
        return saveEvent(updatedEvent);
    }

    public Set<User> getAllSubscribers(Long eventId) {
        Set<User> users = new HashSet<>();
        Set<Long> userIdSet = getEventById(eventId).getUserSubscriptionList();

        for (Long i : userIdSet){
            users.add(userService.getUserById(i));
        }

        return users;
    }

    public Set<Event> getAllSubscriptionsOnEvents(Long userId) {
        List<Event> event = getAll();
        Set<Event> userEvents = new HashSet<>();

        for (Event i : event){
            if (i.getUserSubscriptionList().contains(userService.getUserById(userId))){
                userEvents.add(i);
            }
        }

        return userEvents;
    }

    public void delete(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new EventNotFoundException(id);
        }
    }

}
