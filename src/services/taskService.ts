import { TaskData, TaskPost } from "../types/types";
import http from "./httpService";

export function taskGet(
  workspaceId: number,
  projectId: number,
  boardId: number
) {
  const accessToken = localStorage.getItem("access");

  return http.get(
    `workspaces/${workspaceId}/projects/${projectId}/boards/${boardId}/tasks/`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}

export function taskPost(payload: TaskPost , id:string , idP:string) {
  const accessToken = localStorage.getItem("access");

  return http.post(`workspaces/${id}/projects/${idP}/boards/181/tasks/`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` ,  "Content-Type": "multipart/form-data"
  },
  });
}
