package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Application;
import com.mycompany.myapp.domain.UserTest;
import com.mycompany.myapp.repository.UserTestRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the UserTestResource REST controller.
 *
 * @see UserTestResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserTestResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";

    @Inject
    private UserTestRepository userTestRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserTestMockMvc;

    private UserTest userTest;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserTestResource userTestResource = new UserTestResource();
        ReflectionTestUtils.setField(userTestResource, "userTestRepository", userTestRepository);
        this.restUserTestMockMvc = MockMvcBuilders.standaloneSetup(userTestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userTest = new UserTest();
        userTest.setName(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createUserTest() throws Exception {
        int databaseSizeBeforeCreate = userTestRepository.findAll().size();

        // Create the UserTest

        restUserTestMockMvc.perform(post("/api/userTests")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userTest)))
                .andExpect(status().isCreated());

        // Validate the UserTest in the database
        List<UserTest> userTests = userTestRepository.findAll();
        assertThat(userTests).hasSize(databaseSizeBeforeCreate + 1);
        UserTest testUserTest = userTests.get(userTests.size() - 1);
        assertThat(testUserTest.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void getAllUserTests() throws Exception {
        // Initialize the database
        userTestRepository.saveAndFlush(userTest);

        // Get all the userTests
        restUserTestMockMvc.perform(get("/api/userTests"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userTest.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getUserTest() throws Exception {
        // Initialize the database
        userTestRepository.saveAndFlush(userTest);

        // Get the userTest
        restUserTestMockMvc.perform(get("/api/userTests/{id}", userTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userTest.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserTest() throws Exception {
        // Get the userTest
        restUserTestMockMvc.perform(get("/api/userTests/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserTest() throws Exception {
        // Initialize the database
        userTestRepository.saveAndFlush(userTest);

		int databaseSizeBeforeUpdate = userTestRepository.findAll().size();

        // Update the userTest
        userTest.setName(UPDATED_NAME);

        restUserTestMockMvc.perform(put("/api/userTests")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userTest)))
                .andExpect(status().isOk());

        // Validate the UserTest in the database
        List<UserTest> userTests = userTestRepository.findAll();
        assertThat(userTests).hasSize(databaseSizeBeforeUpdate);
        UserTest testUserTest = userTests.get(userTests.size() - 1);
        assertThat(testUserTest.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void deleteUserTest() throws Exception {
        // Initialize the database
        userTestRepository.saveAndFlush(userTest);

		int databaseSizeBeforeDelete = userTestRepository.findAll().size();

        // Get the userTest
        restUserTestMockMvc.perform(delete("/api/userTests/{id}", userTest.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserTest> userTests = userTestRepository.findAll();
        assertThat(userTests).hasSize(databaseSizeBeforeDelete - 1);
    }
}
