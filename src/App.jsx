import React from 'react';
import Header from './components/header/header';
import TextInput from './components/textInput/input';
import Questionnaire from './containers/questionnaire/questionnaire';
import AuthContextProvider from './contexts/authContext';
import QuestionnaireContextProvider from './contexts/qrContext';
import styles from './App.module.css';

function App() {
  // we could also move this to "QuestionnaireContext" and log with the rest of data
  const [title, setTitle] = React.useState("New Questionair");

  return (
    <div className={styles.appStyles}>
      <AuthContextProvider>
        <Header>
          <TextInput 
            type='text'
            value={title}
            title={title}
            onChange={(e) => setTitle(e.target.value || '')}
            className={styles.headerTitle}
          />
        </Header>
        <QuestionnaireContextProvider>
          <Questionnaire />
        </QuestionnaireContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
