import { BoardPost } from "../types/types";
import http from "./httpService";

export function boardPost(payload:BoardPost, wid:string, pid:string){
    const accessToken = localStorage.getItem("access");
    return http.post(`workspaces/${wid}/projects/${pid}/boards/` , payload ,{
        headers: { Authorization: `Bearer ${accessToken}` },
      });
}
export function boardGet(id :string, idP:string) {
    const accessToken = localStorage.getItem("access");
    return http.get(`workspaces/${id}/projects/${idP}/boards/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
}