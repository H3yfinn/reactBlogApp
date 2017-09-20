import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {//componentDidMount is called after rendiring fdone
    //could do this: if (!this.props.post){} to save network usage. guess how?

    const { id } = this.props.match.params; //params.id = get url.id
    this.props.fetchPosts(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });//callback sends user to index page
  }


  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading...</div>;
    }//the above check is often used imn this situation. guess why?
    return (
      <div>
        <Link to='/'>Back to Index</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}
          >
          Delete post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {//{ posts } es6 for give us posts from state instead of the rets of state
//ownProps === this.props. doing this allows us to grab the individual post instead of all of them.
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsShow);
