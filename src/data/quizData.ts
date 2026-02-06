import { QuizData } from '@/types/quiz';

export const quizData: QuizData = {
  title: "OpenGradient Community Quiz",
  totalQuestions: 15,
  shareTemplate: "I scored {{score}}/15 on the OpenGradient Quiz 🧠⚡ Built for builders. Try it yourself.",
  questions: [
    {
      id: 1,
      question: "What is OpenGradient?",
      options: [
        "A centralized AI SaaS",
        "A Layer 1 network for Open Intelligence",
        "A crypto exchange",
        "A cloud ML service"
      ],
      answer: 1,
      explanation: "OpenGradient is a decentralized L1 providing verifiable AI, secure inference, and portable memory."
    },
    {
      id: 2,
      question: "What core problem does OpenGradient solve?",
      options: [
        "Slow block times",
        "Black-box AI and trapped user data",
        "NFT minting",
        "Token liquidity"
      ],
      answer: 1,
      explanation: "It fixes opaque AI and centralized data ownership using verifiable compute and user-owned memory."
    },
    {
      id: 3,
      question: "Who owns AI memory on OpenGradient?",
      options: ["Platforms", "Developers", "Users", "Validators"],
      answer: 2,
      explanation: "Users fully own and control their encrypted memory vault."
    },
    {
      id: 4,
      question: "What is the Memory Layer?",
      options: [
        "Cloud database",
        "GPU cache",
        "Encrypted portable memory vault",
        "Smart contract storage"
      ],
      answer: 2,
      explanation: "It allows AI context to move across apps, devices, and chains."
    },
    {
      id: 5,
      question: "What does Verifiable Inference provide?",
      options: [
        "Faster GPUs",
        "Cheaper compute",
        "Cryptographically proven AI outputs",
        "Offline execution"
      ],
      answer: 2,
      explanation: "Inference results are cryptographically proven to be authentic."
    },
    {
      id: 6,
      question: "What is the OpenGradient L1 Network?",
      options: [
        "Layer 2 rollup",
        "Storage chain",
        "Blockchain purpose-built for AI",
        "Wallet"
      ],
      answer: 2,
      explanation: "It supports onchain models, inference, memory, and AI agents."
    },
    {
      id: 7,
      question: "Which compute stack does OpenGradient use?",
      options: [
        "CPUs only",
        "GPUs only",
        "GPU + TEE + ZKML",
        "Mobile devices"
      ],
      answer: 2,
      explanation: "OpenGradient combines GPU clusters, trusted hardware, and ZKML."
    },
    {
      id: 8,
      question: "What is the Model Hub?",
      options: [
        "Wallet",
        "Centralized store",
        "Decentralized AI model marketplace",
        "Trading dashboard"
      ],
      answer: 2,
      explanation: "Developers can upload, discover, and deploy models."
    },
    {
      id: 9,
      question: "Which model categories are supported?",
      options: [
        "Only language models",
        "Only DeFi",
        "Language, DeFi, Multimodal, Risk, Optimization",
        "Gaming only"
      ],
      answer: 2,
      explanation: "Multiple categories are supported on the Model Hub."
    },
    {
      id: 10,
      question: "What is the OpenGradient SDK for?",
      options: [
        "Token swaps",
        "NFT minting",
        "Model management and AI workflows",
        "Wallet creation"
      ],
      answer: 2,
      explanation: "The SDK helps build agents, manage models, and run inference."
    },
    {
      id: 11,
      question: "What are Neuro Stack Blockchains?",
      options: [
        "Layer 2s",
        "Storage networks",
        "Custom AI-enabled appchains",
        "Payment rails"
      ],
      answer: 2,
      explanation: "They inherit OpenGradient's AI primitives like verifiable inference and memory."
    },
    {
      id: 12,
      question: "How is user data protected?",
      options: [
        "Passwords",
        "Firewalls",
        "TEE enclaves, encryption, ZKML, cryptographic proofs",
        "Cookies"
      ],
      answer: 2,
      explanation: "Privacy is enforced via hardware security and cryptography."
    },
    {
      id: 13,
      question: "What is BitQuant?",
      options: [
        "Wallet",
        "Explorer",
        "DeFAI quantitative agent",
        "Programming language"
      ],
      answer: 2,
      explanation: "BitQuant is OpenGradient's DeFi AI agent for quantitative workflows."
    },
    {
      id: 14,
      question: "What can developers build on OpenGradient?",
      options: [
        "Only chatbots",
        "Only DeFi",
        "AI agents, DeFi tools, enterprise AI, onchain ML",
        "Games only"
      ],
      answer: 2,
      explanation: "OpenGradient supports many AI-driven applications."
    },
    {
      id: 15,
      question: "What is OpenGradient's main vision?",
      options: [
        "Faster blockchains",
        "NFT marketplaces",
        "AI that remembers, learns, and evolves with users",
        "Replace humans"
      ],
      answer: 2,
      explanation: "OpenGradient focuses on context-aware AI that preserves human agency."
    }
  ]
};
