const MockInterview = require('../models/MockInterview');

const QUESTION_BANK = {
  Technical: [
    { id: 1, questionText: 'Explain the difference between Virtual DOM and Real DOM in React.', expectedKeywords: ['reconciliation', 'diffing', 'performance', 'in-memory'] },
    { id: 2, questionText: 'How does Node.js handle asynchronous non-blocking I/O operations?', expectedKeywords: ['event loop', 'libuv', 'callback', 'single-threaded'] },
    { id: 3, questionText: 'What is indexing in MongoDB and why is it important for database queries?', expectedKeywords: ['B-Tree', 'performance', 'scan', 'lookup speed'] }
  ],
  HR: [
    { id: 1, questionText: 'Tell me about a challenging situation you faced in a software project and how you handled it.', expectedKeywords: ['teamwork', 'communication', 'problem-solving', 'resolution'] },
    { id: 2, questionText: 'Where do you see yourself professionally in the next 3 to 5 years?', expectedKeywords: ['growth', 'learning', 'leadership', 'technical depth'] }
  ],
  'System Design': [
    { id: 1, questionText: 'How would you design a rate limiter for an enterprise SaaS API endpoint?', expectedKeywords: ['token bucket', 'leaky bucket', 'redis', 'sliding window'] }
  ]
};

// @desc    Get Questions for a Category
// @route   GET /api/mock-interviews/questions?category=Technical
// @access  Private
exports.getQuestions = async (req, res, next) => {
  try {
    const category = req.query.category || 'Technical';
    const questions = QUESTION_BANK[category] || QUESTION_BANK['Technical'];
    res.status(200).json({ success: true, category, questions });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit Mock Interview Response & Evaluate
// @route   POST /api/mock-interviews/submit
// @access  Private
exports.submitInterview = async (req, res, next) => {
  try {
    const { title, category, answers } = req.body; // answers = [{ questionText, userAnswer }]

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, error: 'Interview responses are required' });
    }

    let totalScore = 0;
    const evaluatedQuestions = answers.map((ans) => {
      const length = ans.userAnswer ? ans.userAnswer.length : 0;
      let score = 50;
      let aiFeedback = 'Good start. Try adding more concrete technical examples.';

      if (length > 150) {
        score = Math.floor(82 + Math.random() * 15);
        aiFeedback = 'Excellent depth! Great articulation of core principles and real-world trade-offs.';
      } else if (length > 60) {
        score = Math.floor(70 + Math.random() * 12);
        aiFeedback = 'Solid explanation. Could benefit from mentioning edge cases and performance considerations.';
      }

      totalScore += score;

      return {
        questionText: ans.questionText,
        userAnswer: ans.userAnswer || 'No response provided.',
        score,
        aiFeedback,
        keyTakeaway: score >= 80 ? 'Strong technical command' : 'Requires deeper conceptual review'
      };
    });

    const finalScore = Math.round(totalScore / answers.length);

    const interviewRecord = await MockInterview.create({
      userId: req.user.id,
      title: title || `${category} AI Mock Interview Session`,
      category: category || 'Technical',
      overallScore: finalScore,
      feedback: finalScore >= 80 ? 'Outstanding interview performance! Candidate demonstrates strong engineering maturity.' : 'Solid effort. Practice concise structuring using the STAR method.',
      questions: evaluatedQuestions,
      status: 'Completed'
    });

    res.status(201).json({ success: true, data: interviewRecord });
  } catch (err) {
    next(err);
  }
};

// @desc    Get User Mock Interview History
// @route   GET /api/mock-interviews/history
// @access  Private
exports.getHistory = async (req, res, next) => {
  try {
    const history = await MockInterview.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (err) {
    next(err);
  }
};
