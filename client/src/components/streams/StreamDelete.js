import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import { Link } from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDismiss = () => history.push("/");

  onDeleteStream = () => {
    this.props.deleteStream(this.props.stream.id);
  };

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete the stream";
    }

    return `Are you sure you want to delete the stream ${
      this.props.stream.title
    } ?`;
  }
  renderActions() {
    return (
      <>
        <button onClick={this.onDeleteStream} className="ui negative button">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  render() {
    return (
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={this.onDismiss}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(
  mapStateToProps,
  { deleteStream, fetchStream }
)(StreamDelete);
