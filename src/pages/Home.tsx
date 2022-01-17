import React from 'react';

interface Props {}
const Home: React.FC<Props> = () => {
  return (
    <div>
      <div className="container mt-3">
        <h1>Hello there!</h1>
        <div className="typed-out">Your awesome Todo list.</div>
      </div>
    </div>
  );
};

export default Home;
