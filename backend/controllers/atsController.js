const ATSScan = require('../models/ATSScan');

// Intelligent ATS Analyzer Algorithm
const analyzeResumeATS = (targetRole, resumeText, jobDescription) => {
  const commonTechSkills = [
    'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Java', 'TypeScript', 'JavaScript',
    'Docker', 'AWS', 'Kubernetes', 'Git', 'REST API', 'GraphQL', 'Redux', 'Tailwind',
    'SQL', 'PostgreSQL', 'Microservices', 'CI/CD', 'Data Structures', 'Algorithms'
  ];

  const roleKeywordsMap = {
    'Software Engineer': ['React', 'Node.js', 'TypeScript', 'Git', 'Data Structures', 'REST API', 'SQL'],
    'Full Stack Developer': ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Git', 'AWS'],
    'Frontend Engineer': ['React', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind', 'HTML5', 'CSS3'],
    'Backend Engineer': ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Microservices', 'Docker', 'AWS'],
    'Data Scientist': ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'Statistics']
  };

  const requiredKeywords = roleKeywordsMap[targetRole] || ['JavaScript', 'Git', 'React', 'Node.js', 'SQL'];
  
  const textToScan = `${resumeText} ${jobDescription}`.toLowerCase();
  
  const matched = [];
  const missing = [];

  requiredKeywords.forEach(kw => {
    if (textToScan.includes(kw.toLowerCase())) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchRatio = matched.length / requiredKeywords.length;
  const overallScore = Math.min(98, Math.max(45, Math.round(matchRatio * 85 + (resumeText.length > 300 ? 12 : 5))));

  const suggestions = [];
  if (missing.length > 0) {
    suggestions.push(`Incorporate high-impact keywords: ${missing.slice(0, 3).join(', ')}`);
  }
  if (resumeText.length < 500) {
    suggestions.push('Expand bullet points with quantifiable metrics (e.g. "Improved performance by 35%")');
  }
  suggestions.push('Ensure standard section headings like "Professional Summary", "Technical Skills", and "Projects"');
  suggestions.push('Avoid using complex graphic columns that confuse ATS parser bots');

  return {
    overallScore,
    matchedKeywords: matched,
    missingSkills: missing,
    formattingScore: Math.floor(82 + Math.random() * 14),
    readabilityScore: Math.floor(85 + Math.random() * 12),
    suggestions
  };
};

// @desc    Analyze Resume against Job Description
// @route   POST /api/ats/analyze
// @access  Private
exports.analyzeResume = async (req, res, next) => {
  try {
    const { targetRole, resumeText, jobDescriptionText } = req.body;

    if (!targetRole || !resumeText) {
      return res.status(400).json({ success: false, error: 'Target role and resume content are required' });
    }

    const result = analyzeResumeATS(targetRole, resumeText, jobDescriptionText || '');

    const scanRecord = await ATSScan.create({
      userId: req.user.id,
      targetRole,
      overallScore: result.overallScore,
      matchedKeywords: result.matchedKeywords,
      missingSkills: result.missingSkills,
      formattingScore: result.formattingScore,
      readabilityScore: result.readabilityScore,
      suggestions: result.suggestions,
      resumeText,
      jobDescriptionText: jobDescriptionText || ''
    });

    res.status(201).json({ success: true, data: scanRecord });
  } catch (err) {
    next(err);
  }
};

// @desc    Get User Scan History
// @route   GET /api/ats/history
// @access  Private
exports.getScanHistory = async (req, res, next) => {
  try {
    const history = await ATSScan.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (err) {
    next(err);
  }
};
