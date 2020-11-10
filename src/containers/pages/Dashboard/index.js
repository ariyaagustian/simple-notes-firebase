import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  handleSaveNotes = () => {
    const { title, content } = this.state;
    const { saveNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    saveNotes(data);
  };

  render() {
    const { notes } = this.props;
    return (
      <div className="h-screen antialiased font-sans bg-gray-200 pt-3 pl-3 pr-3 pb-3">
        <div className="grid grid-flow-row auto-rows-max">
          <div className="mt-5 md:mt-0 md:col-span-2 pb-4">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        id="title"
                        value={this.state.title}
                        onChange={(e) => this.onInputChange(e, "title")}
                        className="form-input flex-1 block w-full rounded-md shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Input Title Here"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="content"
                    className="block text-sm leading-5 font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <div className="rounded-md shadow-sm">
                    <textarea
                      id="content"
                      rows="3"
                      value={this.state.content}
                      onChange={(e) => this.onInputChange(e, "content")}
                      className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="Input Content Here"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 ">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-32 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    onClick={this.handleSaveNotes}
                  >
                    Save
                  </button>
                </span>
              </div>
            </div>
          </div>
          {notes.length > 0 ? (
            <Fragment>
              {notes.map((note) => {
                return (
                  <div className="md:col-span-2 pt-2" key={note.id}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden bg-white p-6">
                      <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">
                          {note.data.title}
                        </div>
                        <p className="text-gray-700 text-base">
                          {note.data.content}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm">
                          {/* <p className="text-gray-900 leading-none">
                            Jonathan Reinink
                          </p> */}
                          <p className="text-gray-600">{note.data.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
