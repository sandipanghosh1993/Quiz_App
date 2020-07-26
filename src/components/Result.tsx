import React from 'react';
import { Jumbotron, Container, Button, Form, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetQuestions } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ResultProps {
  result: any;
  resetQuestions: Function;
}

interface ResultState {
  redirect: string;
  result: {
    date: string;
    time: string;
    score: number;
    questions: number;
  };
  prevResults: any[];
}

class Result extends React.Component<ResultProps, ResultState> {
  public constructor(props: ResultProps) {
    super(props);
    this.state = {
      redirect: '',
      result: {
        date: '',
        time: '',
        score: 0,
        questions: 1
      },
      prevResults: []
    };
  }

  public componentDidMount() {
    let prevResults = [];
    const storedResults: string | null = localStorage.getItem('funQuizResults');
    if (typeof Storage !== undefined && storedResults) {
      prevResults = JSON.parse(storedResults);
    }
    if (this.props.result) {
      const result = {
        date: new Date().toString(),
        time: this.props.result.time,
        score: this.props.result.score,
        questions: this.props.result.questions
      };
      prevResults = [result, ...prevResults];
      this.setState({
        result,
        prevResults
      });
      localStorage.setItem('funQuizResults', JSON.stringify(prevResults));
    }
  }

  public handleRestart(event: any) {
    this.setState({ redirect: '/' });
    this.props.resetQuestions();
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (!this.props.result) {
      return <Redirect to="/" />;
    }
    return (
      <Jumbotron fluid className="outerJumbotron">
        <Container className="textAlignStart">
          <Button
            variant="info"
            size="sm"
            className="restartButton"
            onClick={this.handleRestart.bind(this)}
          >
            Retake Quiz
          </Button>
          <Form className="seeResultsDropdown">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridQuestions">
                <Form.Control
                  as="select"
                  size="sm"
                  defaultValue={5}
                  onChange={(event: any) => {
                    const result = this.state.prevResults[event.target.value];
                    if (result) {
                      this.setState({
                        result: {
                          date: result.date,
                          time: result.time,
                          score: result.score,
                          questions: result.questions
                        }
                      });
                    }
                  }}
                >
                  <option value={-1} key={-1}>
                    --- See previous quiz results ---
                  </option>
                  {this.state.prevResults.map((item: any, index: number) => {
                    return (
                      <option value={index} key={index}>
                        {item.date}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
          <Jumbotron>
            <h4>
              Time taken:{' '}
              <span style={{ color: '#34495E', fontStyle: 'italic' }}>
                {this.state.result.time}
              </span>
            </h4>
            <h4>
              Correct:{' '}
              <span style={{ color: '#186A3B', fontStyle: 'italic' }}>
                {this.state.result.score}
              </span>
            </h4>
            <h4>
              Incorrect:{' '}
              <span style={{ color: '#922B21', fontStyle: 'italic' }}>
                {this.state.result.questions - this.state.result.score}
              </span>
            </h4>
            <h4>
              Score in %:{' '}
              <span style={{ color: '#1B4F72', fontStyle: 'italic' }}>
                {Math.round(
                  (this.state.result.score / this.state.result.questions) * 100
                )}
              </span>
            </h4>
          </Jumbotron>
        </Container>
      </Jumbotron>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    result: state.result
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ resetQuestions: resetQuestions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
