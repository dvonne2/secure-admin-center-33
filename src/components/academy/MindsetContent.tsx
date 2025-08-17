
import React, { useState, useEffect } from 'react';

export function MindsetContent() {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [assessmentsPassed, setAssessmentsPassed] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(1);

  const updateProgress = () => {
    const totalLessons = 60;
    const progressPercentage = (completedLessons / totalLessons) * 100;
    const progressBar = document.getElementById('mainProgressBar');
    if (progressBar) {
      progressBar.style.width = progressPercentage + '%';
    }
  };

  const toggleLessonCompletion = (checkbox: HTMLElement) => {
    checkbox.classList.toggle('checked');
    
    if (checkbox.classList.contains('checked')) {
      setCompletedLessons(prev => prev + 1);
      // Check if it's an assessment
      if (checkbox.closest('.exam-item')) {
        setAssessmentsPassed(prev => prev + 1);
        const pointsElement = checkbox.closest('.exam-item')?.querySelector('.assessment-points');
        const points = pointsElement ? parseInt(pointsElement.textContent || '0') : 0;
        setTotalPoints(prev => prev + points);
      } else {
        setTotalPoints(prev => prev + 10); // Regular lessons worth 10 points
      }
    } else {
      setCompletedLessons(prev => prev - 1);
      if (checkbox.closest('.exam-item')) {
        setAssessmentsPassed(prev => prev - 1);
        const pointsElement = checkbox.closest('.exam-item')?.querySelector('.assessment-points');
        const points = pointsElement ? parseInt(pointsElement.textContent || '0') : 0;
        setTotalPoints(prev => prev - points);
      } else {
        setTotalPoints(prev => prev - 10);
      }
    }
    
    checkModuleCompletion(checkbox);
  };

  const toggleModuleCompletion = (checkbox: HTMLElement) => {
    checkbox.classList.toggle('checked');
    
    // Update timeline
    const moduleCard = checkbox.closest('.module-card');
    const dayNumber = moduleCard?.id.replace('day', '');
    const timelineDay = document.querySelector(`[onclick="scrollToDay(${dayNumber})"] .timeline-day`);
    
    if (checkbox.classList.contains('checked')) {
      timelineDay?.classList.add('completed');
      timelineDay?.classList.remove('current');
      
      // Move current to next day
      const nextDay = parseInt(dayNumber || '0') + 1;
      if (nextDay <= 10) {
        const nextTimelineDay = document.querySelector(`[onclick="scrollToDay(${nextDay})"] .timeline-day`);
        if (nextTimelineDay) {
          nextTimelineDay.classList.add('current');
        }
      }
      setCurrentStreak(prev => prev + 1);
    } else {
      timelineDay?.classList.remove('completed');
      setCurrentStreak(prev => Math.max(0, prev - 1));
    }
  };

  const checkModuleCompletion = (lessonCheckbox: HTMLElement) => {
    const moduleCard = lessonCheckbox.closest('.module-card');
    const allLessonCheckboxes = moduleCard?.querySelectorAll('.lesson-checkbox');
    const checkedLessons = moduleCard?.querySelectorAll('.lesson-checkbox.checked');
    const moduleCheckbox = moduleCard?.querySelector('.completion-checkbox') as HTMLElement;
    
    if (allLessonCheckboxes && checkedLessons && moduleCheckbox) {
      if (checkedLessons.length === allLessonCheckboxes.length && !moduleCheckbox.classList.contains('checked')) {
        toggleModuleCompletion(moduleCheckbox);
      } else if (checkedLessons.length < allLessonCheckboxes.length && moduleCheckbox.classList.contains('checked')) {
        toggleModuleCompletion(moduleCheckbox);
      }
    }
  };

  const scrollToDay = (dayNumber: number) => {
    const dayElement = document.getElementById('day' + dayNumber);
    dayElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    updateProgress();
  }, [completedLessons, totalPoints, assessmentsPassed, currentStreak]);

  // Make functions globally available for onclick handlers
  useEffect(() => {
    (window as any).toggleLessonCompletion = toggleLessonCompletion;
    (window as any).toggleModuleCompletion = toggleModuleCompletion;
    (window as any).scrollToDay = scrollToDay;
  }, []);

  return (
    <div className="mindset-transformation-content">
      <style jsx>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .mindset-transformation-content {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: #ffffff;
            min-height: 100vh;
            color: #1a1a1a;
        }

        .header {
            background: #000000;
            padding: 2rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }

        .header-content {
            position: relative;
            z-index: 2;
        }

        .academy-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0.5rem 1.5rem;
            border-radius: 2rem;
            color: white;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }

        .hero-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: white;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 300;
            margin-bottom: 2rem;
        }

        .mission-statement {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1rem;
            padding: 1.5rem;
            max-width: 800px;
            margin: 0 auto;
            color: white;
            font-size: 1.1rem;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        .timeline-container {
            background: #f8f9fa;
            border-radius: 1rem;
            padding: 2rem;
            margin: 2rem 0;
            border: 2px solid #e9ecef;
        }

        .timeline-title {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: #000000;
            margin-bottom: 2rem;
        }

        .timeline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            overflow-x: auto;
            padding: 1rem 0;
        }

        .timeline::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(to right, #ff4757, #ffa502, #2ed573);
            transform: translateY(-50%);
            z-index: 1;
        }

        .timeline-item {
            position: relative;
            z-index: 2;
            text-align: center;
            min-width: 120px;
            cursor: pointer;
        }

        .timeline-day {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            border: 3px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.9rem;
            margin: 0 auto 0.5rem;
            transition: all 0.3s ease;
        }

        .timeline-day.completed {
            background: #2ed573;
            border-color: #2ed573;
            color: white;
        }

        .timeline-day.current {
            background: #ffa502;
            border-color: #ffa502;
            color: white;
            animation: pulse 2s infinite;
        }

        .timeline-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #6c757d;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 165, 2, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 165, 2, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 165, 2, 0); }
        }

        .progress-overview {
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 2px solid #f5f5f5;
        }

        .progress-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: #000000;
            margin-bottom: 1rem;
        }

        .progress-bar-container {
            background: #e9ecef;
            border-radius: 1rem;
            height: 12px;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .progress-bar {
            background: linear-gradient(to right, #000000, #333333);
            height: 100%;
            width: 10%;
            transition: width 0.5s ease;
            border-radius: 1rem;
        }

        .progress-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .progress-stat {
            text-align: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 0.5rem;
        }

        .progress-stat-number {
            font-size: 1.5rem;
            font-weight: 900;
            color: #000000;
        }

        .progress-stat-label {
            font-size: 0.8rem;
            color: #6c757d;
            font-weight: 600;
        }

        .stats-bar {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 900;
            color: #000000;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: #6c757d;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .module-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border: 2px solid #f5f5f5;
            position: relative;
            overflow: hidden;
        }

        .module-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #000000;
        }

        .module-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            border-color: #000000;
        }

        .module-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .module-number {
            background: #000000;
            color: white;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1rem;
        }

        .module-title-text {
            flex: 1;
        }

        .module-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #000000;
            margin-bottom: 0.25rem;
        }

        .module-completion {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
        }

        .completion-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .completion-checkbox.checked {
            background: #2ed573;
            border-color: #2ed573;
            position: relative;
        }

        .completion-checkbox.checked::after {
            content: '✓';
            color: white;
            position: absolute;
            top: -2px;
            left: 2px;
            font-size: 14px;
            font-weight: bold;
        }

        .objectives-section {
            background: #f8f9fa;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-left: 3px solid #000000;
        }

        .objectives-title {
            font-weight: 700;
            color: #000000;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .objectives-list {
            list-style: none;
            padding: 0;
        }

        .objectives-list li {
            font-size: 0.85rem;
            color: #495057;
            margin-bottom: 0.25rem;
            padding-left: 1rem;
            position: relative;
        }

        .objectives-list li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: #000000;
            font-weight: bold;
        }

        .lesson-list {
            list-style: none;
        }

        .lesson-item {
            background: #f8f9fa;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 0.75rem;
            border-left: 3px solid #000000;
            transition: all 0.2s ease;
            cursor: pointer;
            position: relative;
        }

        .lesson-item:hover {
            background: #e9ecef;
            transform: translateX(3px);
        }

        .lesson-checkbox {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 16px;
            height: 16px;
            border: 2px solid #ddd;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .lesson-checkbox.checked {
            background: #2ed573;
            border-color: #2ed573;
        }

        .lesson-checkbox.checked::after {
            content: '✓';
            color: white;
            position: absolute;
            top: -2px;
            left: 1px;
            font-size: 12px;
            font-weight: bold;
        }

        .lesson-item.exam-item {
            background: #000000;
            color: white;
            border-left: 3px solid #6c757d;
        }

        .lesson-item.exam-item:hover {
            background: #1a1a1a;
            transform: translateX(3px);
        }

        .lesson-item.exam-item .lesson-title {
            color: white;
        }

        .lesson-item.exam-item .lesson-content {
            color: rgba(255, 255, 255, 0.8);
        }

        .lesson-item.knowledge-test {
            border-left-color: #007bff;
        }

        .lesson-item.reflection {
            border-left-color: #28a745;
        }

        .lesson-item.practical {
            border-left-color: #ffc107;
        }

        .lesson-title {
            font-weight: 600;
            color: #1a1a1a;
            font-size: 0.95rem;
            line-height: 1.4;
            margin-right: 2rem;
        }

        .lesson-number {
            color: #000000;
            font-weight: 800;
            margin-right: 0.5rem;
        }

        .lesson-content {
            margin-top: 0.75rem;
            font-size: 0.85rem;
            color: #6c757d;
            line-height: 1.4;
        }

        .assessment-meta {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
            flex-wrap: wrap;
        }

        .assessment-type {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .assessment-points {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .cta-section {
            background: #000000;
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            color: white;
            margin-top: 3rem;
        }

        .cta-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }

        .cta-button {
            background: white;
            color: #000000;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 800;
            display: inline-block;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .modules-grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 2rem 1rem;
            }

            .timeline {
                justify-content: flex-start;
                gap: 1rem;
            }
        }
      `}</style>

      <div className="header">
        <div className="header-content">
          <div className="academy-badge">VitalVida SystemForce Academy</div>
          <h1 className="hero-title">MINDSET TRANSFORMATION</h1>
          <p className="hero-subtitle">From Instant Gratification to Long-Term Excellence</p>
          <div className="mission-statement">
            <strong>Mission:</strong> Transform your mindset from instant gratification to team-focused vision, building the foundation for sustainable success and exceptional performance in your career journey.
          </div>
        </div>
      </div>

      <div className="container">
        <div className="timeline-container">
          <h3 className="timeline-title">Your 10-Day Transformation Journey</h3>
          <div className="timeline">
            <div className="timeline-item" onClick={() => scrollToDay(1)}>
              <div className="timeline-day current">1</div>
              <div className="timeline-label">Patience</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(2)}>
              <div className="timeline-day">2</div>
              <div className="timeline-label">Vision</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(3)}>
              <div className="timeline-day">3</div>
              <div className="timeline-label">Teamwork</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(4)}>
              <div className="timeline-day">4</div>
              <div className="timeline-label">Your Role</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(5)}>
              <div className="timeline-day">5</div>
              <div className="timeline-label">Growth</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(6)}>
              <div className="timeline-day">6</div>
              <div className="timeline-label">Persistence</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(7)}>
              <div className="timeline-day">7</div>
              <div className="timeline-label">Accountability</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(8)}>
              <div className="timeline-day">8</div>
              <div className="timeline-label">Strategy</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(9)}>
              <div className="timeline-day">9</div>
              <div className="timeline-label">Commitment</div>
            </div>
            <div className="timeline-item" onClick={() => scrollToDay(10)}>
              <div className="timeline-day">10</div>
              <div className="timeline-label">Mastery</div>
            </div>
          </div>
        </div>

        <div className="progress-overview">
          <h3 className="progress-title">Your Learning Progress</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" id="mainProgressBar"></div>
          </div>
          <div className="progress-stats">
            <div className="progress-stat">
              <div className="progress-stat-number">{completedLessons}</div>
              <div className="progress-stat-label">Lessons Completed</div>
            </div>
            <div className="progress-stat">
              <div className="progress-stat-number">{totalPoints}</div>
              <div className="progress-stat-label">Points Earned</div>
            </div>
            <div className="progress-stat">
              <div className="progress-stat-number">{assessmentsPassed}</div>
              <div className="progress-stat-label">Assessments Passed</div>
            </div>
            <div className="progress-stat">
              <div className="progress-stat-number">{currentStreak}</div>
              <div className="progress-stat-label">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">2</div>
            <div className="stat-label">Weeks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10</div>
            <div className="stat-label">Training Days</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">60</div>
            <div className="stat-label">Total Lessons</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000</div>
            <div className="stat-label">Total Points</div>
          </div>
        </div>

        <div className="modules-grid">
          <div className="module-card" id="day1">
            <div className="module-header">
              <span className="module-number">1</span>
              <div className="module-title-text">
                <h3 className="module-title">The Power of Patience</h3>
              </div>
              <div className="module-completion">
                <div className="completion-checkbox" onClick={(e) => toggleModuleCompletion(e.target as HTMLElement)}></div>
              </div>
            </div>
            
            <div className="objectives-section">
              <div className="objectives-title">Learning Objectives:</div>
              <ul className="objectives-list">
                <li>Identify your personal instant gratification triggers and develop strategies to overcome them</li>
                <li>Understand the science behind delayed gratification and its impact on long-term success</li>
                <li>Create a personal patience-building practice you can implement daily</li>
              </ul>
            </div>

            <ul className="lesson-list">
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">1.1</span>
                  Shifting from "I want it now" to thinking long-term
                </div>
                <div className="lesson-content">
                  <strong>Story:</strong> The Chinese bamboo tree and the importance of unseen growth<br/>
                  <strong>Activity:</strong> Group reflection on personal experiences with patience
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">1.2</span>
                  Understanding the Science of Delayed Gratification
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Marshmallow Test insights and neurological benefits of patience<br/>
                  <strong>Activity:</strong> Personal delayed gratification challenge setup
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">1.3</span>
                  Identifying Your Personal Instant Gratification Triggers
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Self-assessment of trigger situations and emotional responses<br/>
                  <strong>Activity:</strong> Trigger mapping worksheet and personal reflection
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span class="lesson-number">1.4</span>
                  Building Your Patience Muscle: Daily Practices
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Practical exercises for developing patience in daily situations<br/>
                  <strong>Activity:</strong> Design your personal patience-building routine
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">1.5</span>
                  Case Study: How Patience Built Nigeria's Most Successful Entrepreneurs
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Real examples of patience leading to extraordinary success<br/>
                  <strong>Activity:</strong> Success timeline analysis and pattern identification
                </div>
              </li>
              <li className="lesson-item exam-item reflection">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">📝</span>
                  <strong>Daily Assessment: Understanding Patience & Long-Term Thinking</strong>
                </div>
                <div className="lesson-content">
                  Reflection-based assessment on patience principles and personal application strategies
                </div>
                <div className="assessment-meta">
                  <span className="assessment-type">Reflection</span>
                  <span className="assessment-points">100</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="module-card" id="day10">
            <div className="module-header">
              <span className="module-number">10</span>
              <div className="module-title-text">
                <h3 className="module-title">Reflection and Celebration</h3>
              </div>
              <div className="module-completion">
                <div className="completion-checkbox" onClick={(e) => toggleModuleCompletion(e.target as HTMLElement)}></div>
              </div>
            </div>
            
            <div className="objectives-section">
              <div className="objectives-title">Learning Objectives:</div>
              <ul className="objectives-list">
                <li>Measure and document your mindset transformation progress over the 10-day journey</li>
                <li>Create a comprehensive 30-60-90 day action plan for continued growth</li>
                <li>Establish a personal board of advisors and mentorship network for ongoing support</li>
              </ul>
            </div>

            <ul className="lesson-list">
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">10.1</span>
                  Celebrating mindset shifts and looking forward
                </div>
                <div className="lesson-content">
                  <strong>Activity:</strong> Group sharing of key takeaways and certificate of completion ceremony
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">10.2</span>
                  Measuring Your Mindset Transformation
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Before/after assessment, progress documentation, transformation evidence<br/>
                  <strong>Activity:</strong> Personal transformation portfolio creation and peer sharing
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">10.3</span>
                  Creating a 30-60-90 Day Action Plan
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Systematic implementation of learned concepts, milestone planning<br/>
                  <strong>Activity:</strong> Detailed action plan creation with accountability checkpoints
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">10.4</span>
                  Building a Personal Board of Advisors
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Mentor selection, advisory relationship building, guidance systems<br/>
                  <strong>Activity:</strong> Advisory board mapping and outreach strategy development
                </div>
              </li>
              <li className="lesson-item">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">10.5</span>
                  Paying It Forward: How to Mentor Others
                </div>
                <div className="lesson-content">
                  <strong>Focus:</strong> Mentorship skills, knowledge transfer, creating a legacy of growth<br/>
                  <strong>Activity:</strong> Mentorship commitment and future trainee support planning
                </div>
              </li>
              <li className="lesson-item exam-item reflection">
                <div className="lesson-checkbox" onClick={(e) => toggleLessonCompletion(e.target as HTMLElement)}></div>
                <div className="lesson-title">
                  <span className="lesson-number">📝</span>
                  <strong>Final Assessment: Complete Mindset Transformation Evaluation</strong>
                </div>
                <div className="lesson-content">
                  Comprehensive reflection assessment covering all mindset transformation principles and future commitments
                </div>
                <div className="assessment-meta">
                  <span className="assessment-type">Comprehensive Reflection</span>
                  <span className="assessment-points">100</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Transform Your Mindset?</h3>
          <p style={{marginBottom: '1.5rem', opacity: 0.9}}>Join the VitalVida SystemForce Academy and develop the mindset that leads to extraordinary career success and personal fulfillment.</p>
          <button className="cta-button">Begin Transformation</button>
        </div>
      </div>
    </div>
  );
}
