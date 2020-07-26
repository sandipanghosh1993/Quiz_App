import React from 'react';
import { Jumbotron, Container, Button, Form, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuestions } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';

interface HomeProps {
  fetchQuestions: Function;
}

interface HomeState {
  redirect: string;
  amount: number;
  category: number;
  difficulty: string;
}

class Home extends React.Component<HomeProps, HomeState> {
  public constructor(props: HomeProps) {
    super(props);
    this.state = {
      redirect: '',
      amount: 10,
      category: 9,
      difficulty: 'medium'
    };
  }

  public hanldeStartQuiz(event: any) {
    event.preventDefault();
    this.props.fetchQuestions(
      this.state.amount,
      this.state.category,
      this.state.difficulty
    );
    this.setState({ redirect: '/question' });
  }

  public questionsOptons() {
    return [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: '30', value: 30 },
      { text: '40', value: 40 },
      { text: '50', value: 50 }
    ];
  }

  public categoryOptons() {
    return [
      { text: 'General Knowledge', value: 9 },
      { text: 'Music', value: 12 },
      { text: 'Geography', value: 22 },
      { text: 'Video Games', value: 15 }
    ];
  }

  public difficultyOptions() {
    return [
      { text: 'Easy', value: 'easy' },
      { text: 'Medium', value: 'medium' },
      { text: 'Hard', value: 'hard' }
    ];
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Jumbotron fluid className="outerJumbotron">
        <Container>
          <h1>Fun Quiz</h1>
          <Form onSubmit={this.hanldeStartQuiz.bind(this)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridQuestions">
                <Form.Label>
                  <h5>
                    <span style={{ color: '#566573' }}>Questions</span>
                  </h5>
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={10}
                  onChange={(event: any) => {
                    this.setState({ amount: event.target.value });
                  }}
                >
                  {this.questionsOptons().map((item: any, index: number) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>
                  <h5>
                    <span style={{ color: '#566573' }}>Category</span>
                  </h5>
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={9}
                  onChange={(event: any) => {
                    this.setState({ category: event.target.value });
                  }}
                >
                  {this.categoryOptons().map((item: any, index: number) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDifficulty">
                <Form.Label>
                  <h5>
                    <span style={{ color: '#566573' }}>Difficulty</span>
                  </h5>
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="medium"
                  onChange={(event: any) => {
                    this.setState({ difficulty: event.target.value });
                  }}
                >
                  {this.difficultyOptions().map((item: any, index: number) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary" size="lg">
              Start
            </Button>
          </Form>
        </Container>
      </Jumbotron>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchQuestions: fetchQuestions }, dispatch);
}

export default connect(null, mapDispatchToProps)(Home);
