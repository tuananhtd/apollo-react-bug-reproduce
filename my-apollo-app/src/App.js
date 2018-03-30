import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query BookQuery($id: Int!){
    getBookById(id: $id) {
      title 
    }
  }
`;

class Book extends React.Component {
  render() {
    const props = this.props;

    if (props.data.loading) {
      return "loading"
    } else {
      return `title: ${props.data.getBookById.title}`
    }
  }
}  

const BookGraphQLComponent = graphql(QUERY)(Book);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  render() {
    const {id} = this.state
    return (
      <div>
        <button onClick={() => this.setState({id: 1 - id})}>
          Change book id
        </button>,
        <BookGraphQLComponent id={id} key="avoid-unmount"/>
      </div>
    )
  }
}

export default App;
