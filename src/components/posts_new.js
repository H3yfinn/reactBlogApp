import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';//doesnt need index on the end!

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; //es6 stuff. makes touched = field.meta.touched
    const className= `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label> {field.label} </label>
        <input
        className='form-control'
          type='text'
          {...field.input}
        />

        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )//^{field.meta.touched ? field.meta.error : ''} =  ternary exression.
    //If first value is true then 2nd value else show 3rd ie. ''
  }

  onSubmit(values) {
    //wahts history? means to match one of the past url routes
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='post title'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'> Submit</button>
        <Link className='btn btn-danger' to='/'>Cancel</Link>
      </form>
    );
  }
}
//validate function seems pretty magical! ie. nothing calls the function on this page
function validate(values) {
  const errors = {};
  //validate the inputs from values
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!'
  }
  if (!values.content || values.content.length <= 0) {
    errors.content = 'Enter some lengthy content!'
  }
  //if errors is empty the form  is fine to submit, else redux assumes form is invlaid
  return errors;
}

export default reduxForm({
  validate, //es6 yahhhhboi
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
