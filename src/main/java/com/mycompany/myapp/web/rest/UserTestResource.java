package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.UserTest;
import com.mycompany.myapp.repository.UserTestRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserTest.
 */
@RestController
@RequestMapping("/api")
public class UserTestResource {

    private final Logger log = LoggerFactory.getLogger(UserTestResource.class);

    @Inject
    private UserTestRepository userTestRepository;

    /**
     * POST  /userTests -> Create a new userTest.
     */
    @RequestMapping(value = "/userTests",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserTest> createUserTest(@RequestBody UserTest userTest) throws URISyntaxException {
        log.debug("REST request to save UserTest : {}", userTest);
        if (userTest.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new userTest cannot already have an ID").body(null);
        }
        UserTest result = userTestRepository.save(userTest);
        return ResponseEntity.created(new URI("/api/userTests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userTest", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userTests -> Updates an existing userTest.
     */
    @RequestMapping(value = "/userTests",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserTest> updateUserTest(@RequestBody UserTest userTest) throws URISyntaxException {
        log.debug("REST request to update UserTest : {}", userTest);
        if (userTest.getId() == null) {
            return createUserTest(userTest);
        }
        UserTest result = userTestRepository.save(userTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userTest", userTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userTests -> get all the userTests.
     */
    @RequestMapping(value = "/userTests",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserTest> getAllUserTests() {
        log.debug("REST request to get all UserTests");
        return userTestRepository.findAll();
    }

    /**
     * GET  /userTests/:id -> get the "id" userTest.
     */
    @RequestMapping(value = "/userTests/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserTest> getUserTest(@PathVariable Long id) {
        log.debug("REST request to get UserTest : {}", id);
        return Optional.ofNullable(userTestRepository.findOne(id))
            .map(userTest -> new ResponseEntity<>(
                userTest,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userTests/:id -> delete the "id" userTest.
     */
    @RequestMapping(value = "/userTests/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserTest(@PathVariable Long id) {
        log.debug("REST request to delete UserTest : {}", id);
        userTestRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userTest", id.toString())).build();
    }
}
