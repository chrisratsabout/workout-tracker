package com.chris.workoutcrud.exception;

public class WorkoutNotFoundException extends RuntimeException{
    public WorkoutNotFoundException(String message){
        super(message);
    }
}
