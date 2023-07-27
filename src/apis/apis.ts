import { Item, PinchEvent } from "@/models/Models";
import axios, { AxiosResponse } from "axios";

const serverURI = "http://localhost:8000";

export interface GenerateItemParam {
  title: string;
  count: number;
  nonrelated_count?: number;
}

export interface GenerateItemResponse {
  items: Item[];
}

export function generateItems(params: GenerateItemParam) {
  return axios.post<GenerateItemParam, AxiosResponse<GenerateItemResponse>>(`${serverURI}/items`, params);
}

export interface GenerateEventParam {
  title: string;
  count: number;
}

export interface GenerateEventResponse {
  events: PinchEvent[];
}

export function generateEvents(params: GenerateEventParam) {
  return axios.post<GenerateEventParam, AxiosResponse<GenerateEventResponse>>(`${serverURI}/events`, params);
}

export interface FindSolutionParam {
  title: string;
  event: string;
  items: string[];
  number_to_use: number;
}

export interface FindSolutionResponse {
  used_items: string[];
  solution: string;
}

export function findSolution(params: FindSolutionParam) {
  return axios.post<FindSolutionParam, AxiosResponse<FindSolutionResponse>>(`${serverURI}/solve`, params);
}

export interface EvaluateSolutionParam {
  title: string;
  event: string;
  solution: string;
}

export interface EvaluateSolutionResponse {
  appropriate_score: number;
  humorous_score: number;
  comment: string;
  tension: number;
}

export function evaluateSolution(params: EvaluateSolutionParam) {
  return axios.post<FindSolutionParam, AxiosResponse<EvaluateSolutionResponse>>(`${serverURI}/evaluate`, params);
}
