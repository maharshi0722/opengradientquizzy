import { useQuiz } from '@/hooks/useQuiz';
import { LandingScreen } from '@/components/LandingScreen';
import { QuizScreen } from '@/components/QuizScreen';
import { ResultsScreen } from '@/components/ResultsScreen';

const Index = () => {
  const {
    state,
    currentQuestion,
    currentQuestionIndex,
    progress,
    score,
    timeTaken,
    username,
    leaderboard,
    totalQuestions,
    startQuiz,
    answerQuestion,
    resetQuiz,
    getShareText,
  } = useQuiz();

  return (
    <div className="min-h-screen">
      {state === 'landing' && (
        <LandingScreen onStart={startQuiz} />
      )}

      {state === 'quiz' && currentQuestion && (
        <QuizScreen
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          score={score}
          onAnswer={answerQuestion}
        />
      )}

      {state === 'results' && (
        <ResultsScreen
          score={score}
          totalQuestions={totalQuestions}
          timeTaken={timeTaken}
          username={username}
          leaderboard={leaderboard}
          shareText={getShareText()}
          onRestart={resetQuiz}
        />
      )}
    </div>
  );
};

export default Index;
