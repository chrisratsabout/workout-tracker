package com.chris.workoutcrud.dao;

import com.chris.workoutcrud.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutDao extends JpaRepository<Workout, Integer> {
}
