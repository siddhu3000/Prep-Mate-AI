import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import styles from '../scss/pages/homepage.module.scss';

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (token) {
      navigate('/interview');
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      {/* Hero Section */}
      <main className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>
                Ace Your Next Tech Interview with <span className={styles.highlight}>AI-Powered</span> Precision
              </h2>
              <p className={styles.heroDescription}>
                Harness the power of artificial intelligence to get personalized interview questions,
                receive instant feedback, and track your progress. Land your dream job faster.
              </p>
              <div className={styles.heroButtons}>
                <a className={styles.buttonSecondary} onClick={handleGetStarted}>Start Prepping!</a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                alt="AI brain illustration"
                className={styles.heroIllustration}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc-a_Kg5Y40yeBDC845WzN2uUnNMUIM95wue9prFtOCG1oRE6nhVvtxuxJK6LRpuDO5jAnH2dNxfOSu9AJElPvzBb0LFSJRcfJXJBiYIaKJRb321TyLO_lgrWWuIgrdCU9-Sh7l7fVDY9vgC5T_gEu1GhnK5Bl_ENoV0ONf13Tq1VwOYjxIe1-1ockXWJ1vegL77kW1uASE_WxWWdrd-DYm4p_2QeORHuE2898zU8ed9Xsl2RFOyOqLHPiUKgw-ACdEV03-s9j7WE"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Why Choose Prep-Mate-AI?</h3>
            <p className={styles.sectionDescription}>Everything you need to confidently walk into your next interview.</p>
          </div>
          <div className={styles.featuresGrid}>
            <FeatureCard
              icon="lightbulb"
              title="AI-Powered Question Generation"
              description="Get unlimited, tailored questions for various domains like DSA, Web, DBMS, and OS,ensuring you're prepared for anything."
              color="blue"
            />
            <FeatureCard
              icon="rate_review"
              title="Intelligent Feedback"
              description="Receive instant, constructive feedback on your answers, highlighting your strengths and areas for improvement."
              color="orange"
            />
            <FeatureCard
              icon="history"
              title="Comprehensive Session History"
              description="Track your progress over time. Review past sessions, including questions, your answers, and the AI's feedback."
              color="teal"
            />
            <FeatureCard
              icon="lock"
              title="Secure User Authentication"
              description="Your data is safe with us. We use JWT-based authentication and secure password hashing to protect your account."
              color="purple"
            />
            <FeatureCard
              icon="devices"
              title="User-Friendly Interface"
              description="A clean, intuitive platform designed to provide a seamless and productive
                interview preparation experience."
              color="red"
            />
            <FeatureCard
              icon="code"
              title="Modular & Scalable"
              description="Built on a modern stack (Spring Boot & React) for a reliable, fast,
                and easily maintainable platform."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection} id="how-it-works">
        <div className={styles.container}>
          <h3 className={styles.sectionTitle}>How It Works in 3 Simple Steps</h3>
          <div className={styles.stepsContainer}>
            <div className={styles.stepsLine}></div>
            <div className={styles.stepsGrid}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>
                  <span>1</span>
                </div>
                <h4 className={styles.stepTitle}>Select Domain</h4>
                <p className={styles.stepDescription}>
                  Choose your area of focus. Our AI will generate relevant questions just for you.
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>
                  <span>2</span>
                </div>
                <h4 className={styles.stepTitle}>Answer & Submit</h4>
                <p className={styles.stepDescription}>
                  Engage with the questions and submit your answers through our easy-to-use interface.
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>
                  <span>3</span>
                </div>
                <h4 className={styles.stepTitle}>Get AI Feedback</h4>
                <p className={styles.stepDescription}>
                  Receive instant, detailed feedback to understand your performance and improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection} id="testimonials">
        <div className={styles.container}>
          <h3 className={styles.sectionTitle}>Loved by Aspiring Developers</h3>
          <div className={styles.testimonialsGrid}>
            <TestimonialCard 
              text="Prep-Mate-AI was a game-changer. The AI feedback helped me pinpoint exactly what I needed to work on. I landed a job at a top tech company!"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAFI9-ed2yIrcxnpCjbCy8_z857GHnP9SriSXo9GCUi3ADQG5FwhnKNM97-PrQERrBiYtZ_B9Q0A5oiTzZT0pXwMM3D2vNZdi63u8L8FF_FJhbX466-7CtpViJ415rCvyijw76KRHJ7nM2LqIO7QyripQVghrvmO49xVyWyJzz5MSjBe2pd1C6rRM6Y7qHoKepubjfIDuIuD2y6OUFC3ykKGSMLTfGzwrKAu3bViUZrzn2fsbV5rwc8gjv_iiVFNhNE4habGfVPcP4"
              name="Pee-Yush Moneyarr"
              role="Software Engineer"
            />
            <TestimonialCard
              text="The question variety is incredible. I felt so much more confident going into my interviews after practicing with this platform."
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBSUlRmlbhTYbgXCcIQzv4tKGNeOePU-n-1Uap0m5_a-tr_2i2osg7Vu_T8tFOViA-4SmJ4ZGlmXo5Y2OELsFNshoWsUxTgicWyVhrCMAu6oZBj1fPI3vXcg0uGszjL-wQyH3K1YFd5VWVnIbs1sO51kS81Oaol6o7sh3zpwfQgoJWFK97iqk20uvw7VnRE59fHDyi_DOJxZFu2h0m7emzvFJz5rKChf-yIupZRNvQJwCz4LNh_AoINcG5IOMHXp_W19YmNb2468Mc"
              name="Bhor-ing Siddhu"
              role="Frontend Developer"
            />
            <TestimonialCard
              text="The session history feature is fantastic for tracking my improvement. It's the best interview prep tool I've used."
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqs80lTxnOPgeePlqGpTjH2asGcHjfpmkX7fPqip44sRTEc9eFA-OzylnBdtLmT_mCoWBvgS8t8ZUoUQSKukDIipDC71wFviwpIa5A3_Do6E67Vzgg3DVVNzjfuXoiU2EYQNFXfcCIIB-VVVkF9E2Nmi8XBEySipwcW0XQPvL8691tg3D4YL4oyzjuLILssyWnAE0urf6LBrsPJSLX3-_Yal5zYMW4vnSyaB2l3_wVOttQH57YRQzryYO494XQAry0vwAUcPjVu0"
              name="Ani-Cat Dhaka-De"
              role="Backend Developer"
            />
            <TestimonialCard
              text="Prep-Mate-AI made me realize my weak spots in real-time. The instant feedback felt just like a real interviewer guiding me. It's the smartest prep tool I've ever used!"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqs80lTxnOPgeePlqGpTjH2asGcHjfpmkX7fPqip44sRTEc9eFA-OzylnBdtLmT_mCoWBvgS8t8ZUoUQSKukDIipDC71wFviwpIa5A3_Do6E67Vzgg3DVVNzjfuXoiU2EYQNFXfcCIIB-VVVkF9E2Nmi8XBEySipwcW0XQPvL8691tg3D4YL4oyzjuLILssyWnAE0urf6LBrsPJSLX3-_Yal5zYMW4vnSyaB2l3_wVOttQH57YRQzryYO494XQAry0vwAUcPjVu0"
              name="Soya Car-Bhari"
              role="Backend Developer"
            />
            <TestimonialCard
              text="The personalized feedback reports were amazing. Instead of generic tips, I got concrete action points tailored to my answers, which boosted my confidence in every practice session."
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqs80lTxnOPgeePlqGpTjH2asGcHjfpmkX7fPqip44sRTEc9eFA-OzylnBdtLmT_mCoWBvgS8t8ZUoUQSKukDIipDC71wFviwpIa5A3_Do6E67Vzgg3DVVNzjfuXoiU2EYQNFXfcCIIB-VVVkF9E2Nmi8XBEySipwcW0XQPvL8691tg3D4YL4oyzjuLILssyWnAE0urf6LBrsPJSLX3-_Yal5zYMW4vnSyaB2l3_wVOttQH57YRQzryYO494XQAry0vwAUcPjVu0"
              name="Su-Honey Hawa-De"
              role="Backend Developer"
            />
            <TestimonialCard
              text="The interface is super clean and intuitive. I never felt lost while navigating the platform, and everything from starting a session to reviewing feedback was seamless. It made practicing so much smoother."
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqs80lTxnOPgeePlqGpTjH2asGcHjfpmkX7fPqip44sRTEc9eFA-OzylnBdtLmT_mCoWBvgS8t8ZUoUQSKukDIipDC71wFviwpIa5A3_Do6E67Vzgg3DVVNzjfuXoiU2EYQNFXfcCIIB-VVVkF9E2Nmi8XBEySipwcW0XQPvL8691tg3D4YL4oyzjuLILssyWnAE0urf6LBrsPJSLX3-_Yal5zYMW4vnSyaB2l3_wVOttQH57YRQzryYO494XQAry0vwAUcPjVu0"
              name="Shrey-Bai In-Galli"
              role="Backend Developer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to Nail Your Next Interview?</h3>
            <p className={styles.ctaDescription}>Join Prep-Mate-AI today and start your journey towards your dream job.</p>
            <Link className={styles.ctaButton} to="/login">Sign Up Now - It's Free!</Link>
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className={styles.featureCard}>
    <div className={`${styles.featureIcon} ${styles[color]}`}>
      <span className={`${styles.materialIcons} material-icons`}>{icon}</span>
    </div>
    <h4 className={styles.featureTitle}>{title}</h4>
    <p className={styles.featureDescription}>
      {description}
    </p>
  </div>
);
const TestimonialCard = ({ text, avatar, name, role }) => (
  <div className={styles.testimonialCard}>
    <p className={styles.testimonialText}>
      "{text}"
    </p>
    <div className={styles.testimonialAuthor}>
      <img
        alt="User avatar"
        className={styles.authorAvatar}
        src={avatar}
      />
      <div className={styles.authorInfo}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.authorRole}>{role}</p>
      </div>
    </div>
  </div>
);

export default HomePage; 