
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  // Add Note
  const submitHandler = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !details.trim()) {
      alert("Please fill in both fields!");
      return;
    }

    // Add new note
    const newTask = [...task, { title: title.trim(), details: details.trim() }];

    setTask(newTask);

    // Reset inputs
    setTitle("");
    setDetails("");
  };

  // Delete Note
  const deleteNote = (idx) => {
    setTask(task.filter((_, index) => index !== idx));
  };

  return (
    <div className="min-h-screen lg:flex bg-black text-white">

      {/* Add Notes Form */}
      <form
        onSubmit={submitHandler}
        className="flex gap-4 lg:w-1/2 p-10 flex-col items-start"
      >
        <h1 className="text-4xl mb-2 font-bold">Add Notes</h1>

        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-2 border-2 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="px-5 w-full font-medium h-32 py-2 border-2 outline-none rounded"
          placeholder="Write Details here"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button
          type="submit"
          className="bg-white active:scale-95 font-medium w-full outline-none text-black px-5 py-2 rounded"
        >
          Add Note
        </button>
      </form>

      {/* Recent Notes */}
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-4xl font-bold">Recent Notes</h1>

        <div className="flex flex-wrap items-start justify-start gap-5 mt-6 min-h-40 max-h-[90%] overflow-auto">

          {task.length === 0 ? (
            <p className="text-gray-400 mt-4">
              No notes available. Add your first note!
            </p>
          ) : (
            task.map((elem, idx) => (
              <div
                key={idx}
                className="flex justify-between flex-col items-start relative h-52 w-40 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]"
              >
                <div>
                  <h3 className="leading-tight text-lg font-bold">
                    {elem.title}
                  </h3>

                  <p className="mt-2 leading-tight text-xs font-semibold text-gray-600">
                    {elem.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteNote(idx)}
                  className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                >
                  Delete
                </button>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
