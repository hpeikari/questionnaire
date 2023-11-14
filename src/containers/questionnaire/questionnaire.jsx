import React from 'react';
import Button from '../../components/button/button';
import TextInput from '../../components/textInput/input';
import Dropdown from '../../components/dropdown/dropdown';
import TextArea from '../../components/textArea/textArea';
import Checkbox from '../../components/checkbox/checkbox';
import RadioButton from '../../components/radioButton/radioButton';
import deleteIcon from '../../icons/delete.svg';
import { QuestionnaireContext } from '../../contexts/qrContext';
import { AuthContext } from '../../contexts/authContext';
import styles from './questionnaire.module.css';

const Divider = () => <span className={styles.divider} />;

// we can instead create enums in TS
const options = [
  { label: 'Short Answer', value: 'shortAnswer' },
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Multiple Choice', value: 'multiChoice' },
  // { label: 'Dropdown', value: 'dropdown' }
];

function Card(props) {
  const {
    id,
    question,
    answerType = 'shortAnswer',
    answers
    } = props.data;

  const handleAnswerChange = (e) => { 
    props.onAnswersUpdate(id, e.target.value);
  }
  
  const handleOptionAdd = (field) => { 
    props.onOptionAdd(id, field);
  }
  
  const handleOptionRemove = (field) => { 
    props.onOptionRemove(id, field);
  }

  const handleOptionChange = (e, field) => { 
    props.onOptionUpdate(id, field, e.target.value);
  }

  return (
    <article className={styles.cardStyle}>
      <TextInput 
        label="Question"
        id={`Question-Id: ${props.data.id}`}
        placeholder="What do you want to ask?"
        value={question}
        onChange={(e) => props.onQuestionUpdate(id, e.target.value)}
      />
      <Divider />
      <Dropdown 
        label="Answer"
        options={options}
        value={answerType}
        onChange={(e) => props.onAnswerTypeUpdate(id, e.target.value)}
        id={`Answer-Id: ${props.data.id}`}
      />
      {answerType === 'shortAnswer' && (
          <TextInput
            placeholder="Short answer text"
            onChange={(e) => handleAnswerChange(e)}
            value={answers}
          />
        )}

        {answerType === 'paragraph' && (
          <TextArea 
            placeholder="Long answer text"
            onChange={(e) => handleAnswerChange(e)}
            value={answers}
          />
        )}

        {answerType === 'checkbox' && (
          <>
            {Object.keys(answers || {}).map((cbId) => (
              <span key={cbId} className={styles.checkboxWrapper}>
                <Checkbox
                  className={styles.checkbox}
                  label={
                    <TextInput 
                      placeholder="Type option value"
                      onChange={(e) => handleOptionChange(e, cbId)}
                      value={answers[cbId]}
                    />
                  }
                />
                <span 
                  className={styles.deleteOption} 
                  title="Remove checkbox"
                  onClick={(e) => handleOptionRemove(cbId)}
                >
                  X
                </span>
              </span>
            ))}
            <Button 
              theme="secondary" 
              className={styles.addOption} 
              onClick={() => handleOptionAdd((new Date()).getTime())}
            > 
              + ADD OPTION
            </Button>
          </>
        )}

        {answerType === 'multiChoice' && (
          <>
            {/* <span className={styles.checkboxWrapper}> */}
              <RadioButton
                choices={answers || []}
                onChange={()=>{/* not trying to select anything here */}}
                radio={(k) => (
                  <>
                    <TextInput 
                      placeholder="Type option value"
                      onChange={(e) => handleOptionChange(e, k)}
                      value={answers[k]}
                    />
                    <span 
                      className={styles.deleteOption} 
                      title="Remove radio-button"
                      onClick={(e) => handleOptionRemove(k)}
                    >
                      X
                    </span>
                  </>
                )}
              />

            <Button 
              theme="secondary" 
              className={styles.addOption} 
              onClick={() => handleOptionAdd((new Date()).getTime())}
            > 
              + ADD OPTION
            </Button>
          </>
        )}
       
        {
        // The requirements are not clear to me. so I am going to skip this one
        // However, the implementation of the Checkbox and Radiobuttons 
        // should be enough to demonstrate the idea
        // {answerType === 'dropdown' && (<Dropdown />)}
        }

      <Divider />
      <footer className={styles.footer}>
        <span className={styles.pageNumber}>{props.pageNumber}</span>
        <img 
          src={deleteIcon} 
          alt="delete" 
          className={styles.deleteIcon} 
          onClick={() => props.onDelete(props.data.id)}
          />
      </footer>
    </article>
  );
}

function Questionnaire(props) {
  const { 
    qstnrs, 
    deleteQstnr, 
    createQstnr, 
    saveAndShare,
    updateQuestion,
    updateAnswerType,
    updateAnswers,
    updateOption,
    removeOption,
    addOption
  } = React.useContext(QuestionnaireContext);

  const { isLoggedIn  } = React.useContext(AuthContext);

  if (!isLoggedIn) {
    return (
      <h4 className={styles.emptyMsg}>
        First login!
      </h4>
    )
  }

  const totalQstnr = qstnrs.length;

  return (
    <section className={styles.container}> 
      <div className={styles.cards}>
        {!!totalQstnr ? qstnrs.map((qstnr, idx) => (
          <Card 
            key={qstnr.id}
            data={qstnr}
            pageNumber={`${idx+1} of ${totalQstnr}`}
            onDelete={deleteQstnr}
            onQuestionUpdate={updateQuestion}
            onAnswerTypeUpdate={updateAnswerType}
            onAnswersUpdate={updateAnswers}
            onOptionUpdate={updateOption}
            onOptionRemove={removeOption}
            onOptionAdd={addOption}
          />
        )) : (
          <h4 className={styles.emptyMsg}>
            List is empty. Add new questions!
            <Divider />
          </h4>
        )}
      
        <Button 
          theme="secondary" 
          onClick={createQstnr}
        >
          + Add Question
        </Button>
        
        <Button 
          className={styles.saveBtn} 
          onClick={saveAndShare} 
          disabled={!totalQstnr}
        > 
          SAVE & SHARE
        </Button>
      </div>
    </section>
  );
}

export default Questionnaire;
