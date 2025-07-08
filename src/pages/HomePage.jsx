import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main>
      <section className='hero'>
        <div className='container'>
          <h1>Your Personal AI Study Assistant</h1>
          <p>
            From complex calculus to historical dates, get instant, expert-level answers for any subject. Your personal AI tutor is here to help you understand, learn, and excel. No question is too big or too small.
          </p>
          <Link to='/interview' className='cta-button'>
            Start Asking Questions
          </Link>
        </div>
      </section>

      <section className='features' id='features'>
        <div className='container'>
          <h2>Why Choose Study Buddy?</h2>
          <div className='features-grid'>
            {/* Card 1 */}
            <div className='feature-card'>
              <div className='feature-icon'>🧠</div>
              <h3>Beyond Search Engines</h3>
              <p>
                Get direct, conversational answers without sifting through endless links. Our AI provides clear, structured explanations tailored to your question.
              </p>
            </div>
            {/* Card 2 */}
            <div className='feature-card'>
              <div className='feature-icon'>🌍</div>
              <h3>Your Universal Tutor</h3>
              <p>
                Struggling with physics, writing an essay, or debugging code? Our AI has a deep knowledge base across all academic disciplines.
              </p>
            </div>
            {/* Card 3 - UPDATED */}
            <div className='feature-card'>
              <div className='feature-icon'>🕒</div>
              <h3>Learning Never Sleeps</h3>
              <p>
                Late-night study session? Early morning cramming? Your AI Study Buddy is always online and ready to help you, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
