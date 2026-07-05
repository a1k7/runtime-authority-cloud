import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AskAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    if (!question.trim()) return;
    
    const responses = {
      'why': "Because Policy v4.2 removed delete_database permission after approval. The agent attempted to execute a database deletion operation that was no longer authorized.",
      'stop': "Execution was blocked because the delegation chain changed from depth 3 to depth 2, reducing the agent's authority scope. The system failed closed to prevent unauthorized action.",
      'policy': "Policy v4.2 was updated mid-execution. The agent's approval was based on v4.1, which permitted the action. v4.2 removed the required permission.",
      'delegation': "The delegation chain shortened from depth 3 to depth 2. This means the agent's authority was reduced mid-execution. The system blocked the action to prevent privilege escalation.",
      'evidence': "The evidence attestation expired. The OIDC token was valid for 600 seconds. At the time of execution, 612 seconds had elapsed. The system blocked the action because the evidence was no longer fresh.",
      'default': "I analyzed the trace. The authority trail broke at Step 4 when the delegation chain shortened from depth 3 to depth 2. This triggered a DENIED state at the commit boundary."
    };

    const lowerQuestion = question.toLowerCase();
    let answer = responses.default;
    if (lowerQuestion.includes('why')) answer = responses.why;
    else if (lowerQuestion.includes('stop') || lowerQuestion.includes('blocked')) answer = responses.stop;
    else if (lowerQuestion.includes('policy')) answer = responses.policy;
    else if (lowerQuestion.includes('delegation')) answer = responses.delegation;
    else if (lowerQuestion.includes('evidence')) answer = responses.evidence;

    setResponse(answer);
  };

  return (
    <motion.div 
      className="card ask-ai full-width"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <div className="card-header">
        <h3>🤖 Ask AI</h3>
        <span className="card-badge">Powered by Governance LLM</span>
      </div>
      
      <div className="card-body">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input 
            type="text" 
            className="ask-ai-input"
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid #2a2a44',
              borderRadius: '10px',
              background: '#1a1a2e',
              color: '#e8e8f0',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            }}
            placeholder="Why did execution stop?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button 
            className="ask-ai-btn"
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              background: '#6c5ce7',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            }}
            onClick={handleAsk}
          >
            Ask
          </button>
        </div>
        {response && (
          <motion.div 
            className="ask-ai-response"
            style={{
              marginTop: '12px',
              padding: '12px 16px',
              background: '#1a1a2e',
              borderRadius: '10px',
              borderLeft: '3px solid #6c5ce7',
              fontSize: '14px',
              color: '#a0a0b8',
              animation: 'slideDown 0.3s ease'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {response}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default AskAI;