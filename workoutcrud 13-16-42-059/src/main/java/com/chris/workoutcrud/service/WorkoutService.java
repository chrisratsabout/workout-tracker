package com.chris.workoutcrud.service;

import com.chris.workoutcrud.dao.WorkoutDao;
import com.chris.workoutcrud.exception.WorkoutNotFoundException;
import com.chris.workoutcrud.model.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkoutService  {

    @Autowired
    WorkoutDao dao;


    public Iterable<Workout> getAllWorkouts() {
        return dao.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }



    public Optional<Workout> getWorkoutById(int id) {
        return dao.findById(id);
    }

    public Workout addOneWorkout(Workout workout) {
        return dao.save(workout);
    }

    public Workout replaceWorkoutById(int id, Workout workout) {
        Optional<Workout> optional = dao.findById(id);
        if(optional.isEmpty()){
            throw new WorkoutNotFoundException("Workout not found.");
        }
        Workout workoutInDb = optional.get();


        if(workout.getTitle() != null){
            workoutInDb.setTitle(workout.getTitle());
        }

        if(workout.getDate() != null){
            workoutInDb.setDate(workout.getDate());
        }

        if(workout.getCalories() != null){
            workoutInDb.setCalories(workout.getCalories());
        }

        if(workout.getDistance() != null){
            workoutInDb.setDistance(workout.getDistance());
        }

        if(workout.getDescription() != null){
            workoutInDb.setDescription(workout.getDescription());
        }

       return dao.save(workoutInDb);
    }

    public void deleteWorkoutById(int id) {
        dao.deleteById(id);
    }
}
