package com.lr.taskmanagerapi;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.hamcrest.collection.IsCollectionWithSize;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:db-test.properties")
@Sql("/test-h2.sql")
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@AutoConfigureMockMvc
class TaskManagerApiApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	public void shouldReturnAllTasks() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
				.andExpect(status().isOk());
	}

	@Test
	public void shouldSaveNewTask() throws Exception {
		Task newTask = new Task();
		newTask.setDescription("New Test");
		mockMvc.perform(post("/task")
			   .content(objectMapper.writeValueAsString(newTask))
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(status().isCreated());
	}

	@Test
	public void shouldDeleteTask() throws Exception {
		Task newTask = new Task();
		newTask.setDescription("Test to delete");
		String response = mockMvc.perform(post("/task")
			   .content(objectMapper.writeValueAsString(newTask))
			   .contentType(MediaType.APPLICATION_JSON))
			   .andReturn().getResponse().getContentAsString();

		String id = objectMapper.readValue(response, ObjectNode.class).get("id").asText();

		mockMvc.perform(delete("/task/" + id))
			   .andExpect(status().isOk());
	}
}
