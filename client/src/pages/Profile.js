import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import TrainerList from '../components/TrainerList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_TRAINER } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addTrainer] = useMutation(ADD_TRAINER);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addTrainer({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Trainer
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <WorkoutList
            workouts={user.workouts}
            title={`${user.username}'s workouts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <TrainerList
            username={user.username}
            trainerCount={user.trainerCount}
            trainers={user.trainers}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <WorkoutForm />}</div>
    </div>
  );
};

export default Profile;
