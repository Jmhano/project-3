import React from 'react';
import { Link } from 'react-router-dom';

const TrainerList = ({ trainerCount, username, trainers }) => {
  if (!trainers || !trainers.length) {
    return <p className="bg-dark text-light p-3">{username}, make some trainers!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {trainerCount} {trainerCount === 1 ? 'trainer' : 'trainers'}
      </h5>
      {trainers.map(trainer => (
        <button className="btn w-100 display-block mb-2" key={trainer._id}>
          <Link to={`/profile/${trainer.username}`}>{trainer.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default TrainerList;
