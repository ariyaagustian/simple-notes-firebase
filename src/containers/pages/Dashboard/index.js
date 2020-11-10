import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Save",
    noteId: "",
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
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (textButton === "Save") {
      saveNotes(data);
      this.setState({
        title: "",
        content: "",
        textButton: "Save",
      });
    } else {
      data.noteId = noteId;
      updateNotes(data);
      this.setState({
        title: "",
        content: "",
        textButton: "Save",
      });
    }
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Save",
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNote(data);
  };

  render() {
    const { notes } = this.props;
    const { title, content, textButton } = this.state;
    const { updateNotes, cancelUpdate, deleteNote } = this;
    return (
      <div className="h-full antialiased font-sans bg-gray-200 p-15">
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
                        value={title}
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
                      value={content}
                      onChange={(e) => this.onInputChange(e, "content")}
                      className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="Input Content Here"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 ">
                <span className="inline-flex rounded-md">
                  {textButton === "Update" ? (
                    <button
                      type="submit"
                      className="inline-flex m-2 justify-center py-2 px-32 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
                      onClick={cancelUpdate}
                    >
                      Cancel
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    className="inline-flex m-2 justify-center py-2 px-32 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    onClick={this.handleSaveNotes}
                  >
                    {textButton}
                  </button>
                </span>
              </div>
            </div>
          </div>
          {notes.length > 0 ? (
            <Fragment>
              {notes.map((note) => {
                return (
                  <div
                    className="md:col-span-2 pt-10 pr-10 pl-10"
                    key={note.id}
                    onClick={() => updateNotes(note)}
                  >
                    <div className="shadow cursor-pointer hover:bg-blue-200 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white sm:rounded-md sm:overflow-hidden bg-white p-6">
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
                      <div className="flex pt-5 text-center">
                        <div className="inline-flex rounded-md">
                          <button
                            className="inline-flex m-2 justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out"
                            onClick={(e) => deleteNote(e, note)}
                          >
                            Delete
                          </button>
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
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
  deleteNote: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
