import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout($workoutText: String!) {
    addWorkout(workoutText: $workoutText) {
      _id
      workoutText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($workoutId: ID!, $reactionBody: String!) {
    addReaction(workoutId: $workoutId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_TRAINER = gql`
  mutation addTrainer($id: ID!) {
    addTrainer(trainerId: $id) {
      _id
      username
      trainerCount
      trainers {
        _id
        username
      }
    }
  }
`;

export const REMOVE_TRAINER = gql`
  mutation removeTrainer($id: ID!) {
    removeTrainer(id: $id) {
      _id
      username
      trainers {
        _id
        username
      }
    }
  }
`;
