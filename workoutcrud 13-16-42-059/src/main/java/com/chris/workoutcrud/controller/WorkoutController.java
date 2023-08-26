package com.chris.workoutcrud.controller;

import com.chris.workoutcrud.exception.WorkoutNotFoundException;
import com.chris.workoutcrud.model.Workout;
import com.chris.workoutcrud.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/workouts")
public class WorkoutController {

    @Autowired
    WorkoutService workoutService;

    @GetMapping("")
    public Iterable<Workout> getAllWorkouts(){
        return workoutService.getAllWorkouts();
    }


    @GetMapping("/{id}")
    public Optional getWorkoutById(@PathVariable int id){
        Optional<Workout> optional = workoutService.getWorkoutById(id);
        if(optional.isEmpty()){
            throw new WorkoutNotFoundException("Workout not found.");
        }
        return optional;
    }

    @PostMapping("")
    public Workout addOneWorkout(@RequestBody Workout workout){
        return workoutService.addOneWorkout(workout);
    }

    @PatchMapping("/{id}")
    public Workout replaceWorkout(@PathVariable int id, @RequestBody Workout workout){

        return workoutService.replaceWorkoutById(id, workout);

    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable int id){
        workoutService.deleteWorkoutById(id);
    }


}
