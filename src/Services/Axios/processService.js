import { APIProcess } from "./BaseService";

export async function getProcessByID(ID, toast) {
  try {
    const response = await APIProcess.get(`/records/${ID}`);
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar processo!");
  }
}
