import React from 'react';
import { Jumbotron, Container, Button, Spinner, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetQuestions, sendScore } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';

interface QuestionProps {
  questions: any;
  sendScore: Function;
  resetQuestions: Function;
}

interface QuestionState {
  questions: any[];
  selectedItem: string;
  currentIndex: number;
  score: number;
  startTime: number;
  redirect: string;
}

class Question extends React.Component<QuestionProps, QuestionState> {
  public constructor(props: QuestionProps) {
    super(props);
    this.state = {
      questions: [],
      selectedItem: '',
      currentIndex: 0,
      score: 0,
      startTime: 0,
      redirect: ''
    };
  }

  public static getDerivedStateFromProps(prevProps: any, nextState: any) {
    if (prevProps.questions && !nextState.questions.length) {
      return {
        questions: prevProps.questions.data.results.map((item: any) => {
          return {
            question: item.question,
            answers: [...item.incorrect_answers, item.correct_answer].sort(
              () => Math.random() - 0.5
            ),
            correct: item.correct_answer
          };
        }),
        startTime: new Date().getTime()
      };
    }
    return {};
  }

  public handleSubmit(event: any) {
    event.preventDefault();
    let index = this.state.currentIndex;
    let score = this.state.score;
    if (this.state.questions[index].correct === this.state.selectedItem) {
      ++score;
    }
    const totalQuestions = this.state.questions.length;
    if (this.state.currentIndex === totalQuestions - 1) {
      const durationInSec =
        (new Date().getTime() - this.state.startTime) / 1000;
      this.props.sendScore(durationInSec, totalQuestions, score);
      this.setState({ redirect: '/result' });
    } else {
      this.setState({ currentIndex: ++index, selectedItem: '', score: score });
    }
  }

  public handleChange(event: any) {
    this.setState({ selectedItem: event.target.id });
  }

  public htmlDecode(input: string) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent as string;
  }

  public handleRestart(event: any) {
    this.setState({ redirect: '/' });
    this.props.resetQuestions();
  }

  public render() {
    if (!this.props.questions && !this.state.redirect) {
      return (
        <Jumbotron fluid className="outerJumbotron">
          <Spinner animation="border" variant="info" role="status" />
          <h4>Loading...</h4>
        </Jumbotron>
      );
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Jumbotron fluid className="outerJumbotron">
        <Container>
          <Button
            variant="info"
            size="sm"
            className="restartButton"
            onClick={this.handleRestart.bind(this)}
          >
            Restart
          </Button>
          <Jumbotron className="innerJumbotron">
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              className="textAlignStart"
            >
              <h4>
                {this.htmlDecode(
                  this.state.questions[this.state.currentIndex].question
                )}
              </h4>
              <Form.Group>
                {this.state.questions[this.state.currentIndex].answers.map(
                  (item: string) => {
                    item = this.htmlDecode(item);
                    return (
                      <Form.Check
                        type="radio"
                        id={item}
                        label={item}
                        onChange={this.handleChange.bind(this)}
                        checked={item === this.state.selectedItem}
                        key={item}
                      />
                    );
                  }
                )}
              </Form.Group>
              <Button
                variant="success"
                size="sm"
                type="submit"
                disabled={!this.state.selectedItem}
              >
                Next
              </Button>
            </Form>
          </Jumbotron>
        </Container>
      </Jumbotron>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    { sendScore: sendScore, resetQuestions: resetQuestions },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
