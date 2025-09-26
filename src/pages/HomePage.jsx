import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <section className='hero'>
        <h1>PLACIFY</h1>
        <h2>The Power To Place You Ahead</h2>
        <p>
          Placify empowers you with interview preparation, real-time analytics, and personalized learning tools to help you ace your interviews and grow your career.
        </p>
        <Link to='/login' className='cta-button'>
          Get Started
        </Link>
      </section>

      <section className='features'>
        <h2>Why Choose Placify?</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>🎯</div>
            <Link to = "/EmotionSupport " className='text-green-700 hover:underline'>
               <h3>Emotion Support</h3>
            </Link>
            <p>
              Practice with real-time feedback and analysis to boost your confidence and skills for every interview scenario.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🤖</div>
            <Link to = "/StudyRoom " className='text-green-700 hover:underline'>
            <h3>Study Room</h3>
            </Link>
            <p>
              Get personalized coaching with advanced emotion recognition and insight-driven tips tailored just for you.
            </p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>📊</div>
            <h3>AI Interviews</h3>
            <p>
              Monitor your interview skills with detailed analytics and actionable advice to keep improving.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;