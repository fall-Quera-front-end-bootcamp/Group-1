import React, { useState, useEffect } from "react";
import axios from "axios";
import icons from "../../utils/icons/icons";
import { TaskData } from "../../types/types";

const Card: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const apiUrl = "http://185.8.174.74:8000";

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get<TaskData>(
          "http://185.8.174.74:8000/workspaces/286/projects/41/boards/6/tasks/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        const data = response.data;
        console.log(taskData, "tsk");
        setTaskData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching task data:", error);
        setIsLoading(false);
      }
    };
    fetchTaskData();
  }, []);
  console.log(apiUrl + taskData?.thumbnail, "sk");

  return (
    <div
      className="w-[249px] bg-white rounded-lg p-4 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img
            src={apiUrl + taskData?.thumbnail}
            alt="Task Photo"
            className="w-[257px] h-[134px] rounded-md"
          />
          <div className="flex flex-col text-right py-2 space-y-2">
            <p>{taskData?.name}</p>
            <p>{taskData?.description}</p>
            <div className="flex items-center justify-end">
              {icons.check_round_square("#C9CBDA", "16px")}
              <p>{taskData?.deadline}</p>
              {icons.flag("red", "16px")}
            </div>
            <div className="flex items-center justify-end">
              <p className="bg-purple-200 text-purple-700 rounded-lg py-1 px-2 mx-2">
                پروژه
              </p>
              <p className="bg-blue-200 text-blue-700 rounded-lg p-1 px-2">
                درس
              </p>
            </div>
            {isHovered && (
              <div>
                <p className="border-b border-gray-200 mb-5 block"></p>
                <div className="flex justify-between mb-5">
                  {icons.dots("#323232", "20px")}
                  {icons.check_circle("#323232", "20px")}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
