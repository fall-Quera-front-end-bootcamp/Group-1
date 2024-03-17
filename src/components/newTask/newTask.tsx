import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import icons from "../../utils/icons/icons";
import CalendarModal from "../calendar/calendarModal";
import PriorityCard from "../priority/priority";
import { taskPost } from "../../services/taskService";
import axios from "axios";

type FormData = {
  name: string;
  description: string;
  attachment: string;
  thumbnail: string;
  order: string;
  priority: string;
};
interface TaskFormProps {
  modalNewTask: boolean;
  handleClose: () => void;
  idPName: string;
  id: string;
  idP: string;
  handleChange: () => void;
  bId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  modalNewTask,
  handleClose,
  idPName,
  id,
  idP,
  handleChange,
  bId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedColor1, setSelectedColor1] = useState("");
  const [selectedBorderColor1, setSelectedBorderColor1] = useState("");
  const [priority1, setPriority1] = useState("");
  const [attachment, setAttachment] = useState<File | any>();
  const [thumbnail, setThumbnail] = useState<File | any>();

  const handleState = (
    selectedColor: string,
    selectedBorderColor: string,
    priority: string
  ) => {
    setSelectedColor1(selectedColor);
    setSelectedBorderColor1(selectedBorderColor);
    setPriority1(priority);
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
    setIsOpen(false);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  const handleClose2 = () => {
    setCalOpen(false);
    setPriorityOpen(false);
  };

  const handleSubmitTask: SubmitHandler<FormData> = async (data) => {
    data.attachment = attachment;
    data.thumbnail = thumbnail;
    console.log(data);
    try {
      const token = localStorage.getItem("access");
      // Send formData to the server using Axios or any other HTTP client library
      const response = await axios.post(
        `http://185.8.174.74:8000/workspaces/${id}/projects/${idP}/boards/${bId}/tasks/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleChange();

      // console.log(response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      setAttachment(files[0]);
    }
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      setThumbnail(files[0]);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitTask)}
        className=" border rounded-3xl"
        encType="multipart/form-data"
      >
        <div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-[2px] z-10"
          onClick={handleOverlayClick}
        >
          <div className="bg-white py-5 px-10 rounded-xl w-[1150px]  flex flex-col justify-between items-stretch">
            <div className="flex justify-between items-center mx-6 my-6">
              <div className="flex justify-between items-center">
                <span className="bg-gray-300 mx-1 w-[16px] h-[16px] rounded ml-2"></span>
                <h2
                  className=" text-2xl font-medium"
                  onClick={() => {
                    console.log(bId);
                  }}
                >
                  عنوان تسک
                </h2>
              </div>
              <button onClick={handleClose}>
                {icons.close("#BDBDBD", "32px")}
              </button>
            </div>
            <div className="flex mx-6">
              <div className="mb-4 flex items-center">
                <label htmlFor="project" className="p-2">
                  در
                </label>
                <p className=" border rounded-md py-1 px-3 w-[150px]">
                  {idPName}
                </p>
              </div>
              <div className="mb-4 relative flex items-center ">
                <label htmlFor="user" className="block p-2">
                  برای
                </label>
                <div
                  className=" border-dashed border-2 rounded-full flex justify-center items-center cursor-pointer w-[34px] h-[34px] "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {icons.user_add("gray", "20px")}
                  {selectedUser}
                </div>
                {isOpen && (
                  <div className="absolute z-10  mt-1 bg-white border rounded">
                    <div
                      className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleUserSelect("کاربر ۱")}
                    >
                      کاربر ۱
                    </div>
                    <div
                      className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleUserSelect("کاربر ۲")}
                    >
                      کاربر ۲
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-7 mt-4 mx-6">
              <div className="flex item-center gap-x-3 border rounded-xl py-2">
                <label htmlFor="name" className="mr-3"></label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  value={name}
                  placeholder="عنوان تسک"
                  className="w-5/6 outline-none"
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1"></label>
                <textarea
                  {...register("description")}
                  id="description"
                  className="w-full border rounded-xl py-4 px-6 outline-none resize-none"
                  rows={6}
                  placeholder="توضیحاتی برای این تسک بنویسید"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
            </div>
            <div className="mb-8 mr-6 flex items-center">
              <p className="ml-6">افزودن پیوست :</p>
              <div>
                <label
                  htmlFor="attachment"
                  className="block custom-file-input-task"
                >
                  {icons.attach("#208D8E", "20px")}
                  <p className="pr-1">آپلود فایل</p>
                </label>
                <input
                  // {...register("attachment")}
                  type="file"
                  onChange={handleAttachmentChange}
                  id="attachment"
                  className="w-full hidden"
                />
              </div>
            </div>
            <div className="mb-8 mr-6 flex items-center">
              <p className="ml-6">افزودن کاور :</p>
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block custom-file-input-task"
                >
                  {icons.attach("#208D8E", "20px")}
                  <p className="pr-1">آپلود فایل</p>
                </label>
                <input
                  {...register("thumbnail")}
                  type="file"
                  onChange={handleThumbnailChange}
                  id="thumbnail"
                  className="w-full hidden"
                />
              </div>
            </div>
            <div className="flex items-center justify-between m-6">
              <div className="flex items-center gap-x-5 relative">
                {priorityOpen && (
                  <PriorityCard
                    handleClose2={handleClose2}
                    onStateChange={handleState}
                  />
                )}
                <button
                  className={`rounded-full border-dashed ${selectedBorderColor1} border-2 p-2 flex justify-center items-center`}
                  onClick={() => setPriorityOpen(true)}
                >
                  {icons.flag(selectedColor1 || "#C1C1C1", "30px")}
                </button>

                <button
                  className="rounded-full border-dashed border-2 p-2 flex justify-center items-center"
                  onClick={() => setCalOpen(true)}
                >
                  {icons.calender_full("#C1C1C1", "30px")}
                </button>
                <button className="rounded-full border-dashed border-2 p-2 flex justify-center items-center">
                  {icons.tag("#C1C1C1", "30px")}
                </button>
              </div>
              <button type="submit" className="button-bg px-7 py-1 text-s">
                ساختن تسک
              </button>
            </div>
          </div>
        </div>
      </form>
      {calOpen && <CalendarModal handleClose2={handleClose2} />}
    </>
  );
};

export default TaskForm;
