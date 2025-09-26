// FILE PATH: frontend/src/pages/HomePage.jsx
// This is the final code for your Home Page.

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <section className='hero'>
        <h1>PLACIFY</h1>
        <h2>The Power To Place You Ahead</h2>
        <p>
          From complex calculus to historical dates, get instant, expert-level answers for any subject. Your personal AI tutor is here to help you understand, learn, and excel. No question is too big or too small.
        </p>
        <Link to='/interview' className='cta-button'>
          Start Asking Questions
        </Link>
      </section>

      <section className='features'>
        <h2>Why Choose Study Buddy?</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>🧠</div>
            <h3>Beyond Search Engines</h3>
            <p>
              Get direct, conversational answers without sifting through endless links. Our AI provides clear, structured explanations tailored to your question.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🌍</div>
            <h3>Your Universal Tutor</h3>
            <p>
              Struggling with physics, writing an essay, or debugging code? Our AI has a deep knowledge base across all academic disciplines.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🕒</div>
            <h3>Learning Never Sleeps</h3>
            <p>
              Late-night study session? Early morning cramming? Your AI Study Buddy is always online and ready to help you, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
