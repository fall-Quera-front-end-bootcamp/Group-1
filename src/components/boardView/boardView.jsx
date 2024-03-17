import { useState, useEffect } from "react";
import icons from "../../utils/icons/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../task/task";
import config from "../../config.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import BoardModal from "./boardModal/boardModal";
import TaskForm from "../newTask/newTask";
import { projectsId } from "../../services/projectService";

function BoardView() {
  const { wid, pid } = useParams();
  const [boards, setBoards] = useState([]);
  const [state, setState] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalNewTask, setModalNewTask] = useState(false);
  const [pro, setPro] = useState({});
  const [name, setName] = useState("");

  const [update, setUpdate] = useState(0);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const handleCloseModal = () => {
    setModal(false);
    setModalNewTask(false);
  };
  const { darkMode } = useDarkMode();
  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    axios
      .get(config.apiUrl + `/workspaces/${wid}/projects/${pid}/boards/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wid, pid, update]);

  useEffect(() => {
    projectsId(wid, pid)
      .then((response) => {
        setPro(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
        console.log(error);
      });
  }, [pid, wid]);

  const handlePro = () => {
    setName(pro.name);
  };

  const handleUpdate = () => {
    setUpdate(update + 1);
  };
  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Get source and destination column indices
    const sourceColumnIndex = +source.droppableId;
    const destinationColumnIndex = +destination.droppableId;

    // If the card is dropped in the same column and position
    if (
      sourceColumnIndex === destinationColumnIndex &&
      source.index === destination.index
    ) {
      return;
    }

    // Copy the state array
    const newState = [...state];

    // If the card is dropped within the same column
    if (sourceColumnIndex === destinationColumnIndex) {
      const items = reorder(
        state[sourceColumnIndex],
        source.index,
        destination.index
      );
      newState[sourceColumnIndex] = items;
    } else {
      // If the card is dropped in a different column
      const result = move(
        state[sourceColumnIndex],
        state[destinationColumnIndex],
        source,
        destination
      );
      newState[sourceColumnIndex] = result[sourceColumnIndex];
      newState[destinationColumnIndex] = result[destinationColumnIndex];
    }

    // Update the state
    setState(newState);
  }
  console.log();
  return (
    <>
      <div dir="rtl" className="flex gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {boards.length > 0 ? (
            <Droppable droppableId="0">
              {(provided) =>
                boards.map((board) => {
                  return (
                    <div
                      key={board.id}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex items-center justify-between w-[250px] h-[40px] font-bold  border  rounded-2xl  border-[#D2D6DC] my-4 px-2 ${
                          darkMode
                            ? "border-t-black bg-stone-500 text-white border-[#D2D6DC]"
                            : ""
                        }`}
                        style={{ borderTop: `3px solid ${board.color}` }}
                      >
                        <p>{board.name}</p>
                        <button className="flex items-center">
                          {icons.dots("#323232", "24px")}
                          {icons.plus("#323232", "24px")}
                        </button>
                      </div>
                      {board.tasks.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Card {...item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      <button
                        className="my-1  border-2 border-[#208d8e] text-[#208d8e] rounded-lg p-1 w-[250px] hover:bg-[#208d8e] hover:text-white"
                        onClick={() => {
                          setModalNewTask(true);
                          setSelectedBoardId(board.id);
                          handlePro();
                        }}
                      >
                        ساختن تسک جدید
                      </button>
                      {provided.placeholder}
                    </div>
                  );
                })
              }
            </Droppable>
          ) : (
            <div>
              <button
                onClick={() => {
                  setModal(true);
                }}
              >
                <div
                  className="flex items-center justify-start w-[250px] h-[40px] font-bold  border  rounded-2xl  my-4 px-2"
                  style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.2)" }}
                >
                  {icons.plus("black", "20px")}
                  <p>ساختن برد جدید</p>
                </div>
              </button>
            </div>
          )}
        </DragDropContext>
      </div>
      {modal && (
        <BoardModal
          handleClose={handleCloseModal}
          modal={modal}
          wid={wid}
          pid={pid}
          handleChange={handleUpdate}
        />
      )}
      {modalNewTask && (
        <TaskForm
          id={wid}
          idP={pid}
          handleClose={handleCloseModal}
          handleChange={handleUpdate}
          bId={selectedBoardId}
          idPName={name}
        />
      )}
    </>
  );
}

export default BoardView;
