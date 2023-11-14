import React, { useEffect } from 'react';
import { AuthContext } from './authContext';

export const QuestionnaireContext = React.createContext({});

function QuestionnaireContextProvider(props) {
  const { isLoggedIn } = React.useContext(AuthContext);

  const [qstnrs, setQstnrs] = React.useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setQstnrs([])
    }
  }, [isLoggedIn])
  
  const createQstnr = () => setQstnrs((qstnrs) => {
    const date = new Date();
    const uniqId = date.getTime(); // a simple unique id, because why not?!
    return qstnrs.concat([{
      id: uniqId
    }])}
  );

  const deleteQstnr = (qrId) => setQstnrs((qstnrs) => qstnrs.filter((q) => q.id !== qrId))

  const updateQuestion = (qrId, value) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => q.id !== qrId ? q : {
      ...q,
      'question': value
    }))
  } 

  const updateAnswerType = (qrId, value) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => q.id !== qrId ? q : {
      ...q,
      'answerType': value,
      answers: undefined // reset answers
    }))
  } 

  const updateAnswers = (qrId, value) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => q.id !== qrId ? q : {
      ...q,
      answers: value
    }))
  } 

  const addOption = (qrId, field) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => q.id !== qrId ? q : {
      ...q,
      answers: {
        ...q.answers,
        [field]: ''
      }
    }))
  } 

  const removeOption = (qrId, field) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => {
      const isThisQtr = q.id === qrId;
      const { [field]: omitted, ...restAnswers } = q.answers || {};
      return !isThisQtr ? q : {
        ...q,
        answers: restAnswers
      }
    }))
  } 

  const updateOption = (qrId, field, value) => {
    setQstnrs((qstnrs) => qstnrs.map((q) => q.id !== qrId ? q : {
      ...q,
      answers: {
        ...q.answers,
        [field]: value
      }
    }))
  } 

  // log it to console and then clear the list
  const saveAndShare = () => {
    console.log('Here is the list of quationnaires ---> ', qstnrs);
    setQstnrs([]); // clear the list
  }

  return (
    <QuestionnaireContext.Provider 
      value={{ 
        qstnrs,
        setQstnrs,
        deleteQstnr,
        createQstnr,
        saveAndShare,
        updateQuestion,
        updateAnswerType,
        updateAnswers,
        updateOption,
        removeOption,
        addOption
      }}
    >
      {props.children}
    </QuestionnaireContext.Provider>
  );
}

export default QuestionnaireContextProvider;
