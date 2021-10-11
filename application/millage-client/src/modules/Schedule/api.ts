import axios from 'axios';
import type {
  GetScheduleListRes,
  CreateScheduleReq,
  CreateScheduleRes,
  UpdateScheduleReq,
  UpdateScheduleRes,
  DeleteScheduleRes,
  DeleteScheduleReq,
} from './types';
import {SERVER} from '@constants';

export async function getScheduleListApi() : Promise<GetScheduleListRes> {
  return axios.get<GetScheduleListRes>(
      `${SERVER}/schedule/personal`,
      {withCredentials: true}
  ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

export async function getUnitScheduleListApi(): Promise<GetScheduleListRes> {
  return axios.get<GetScheduleListRes>(
      `${SERVER}/schedule/recentUnit`,
      {withCredentials: true}
  ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

export async function createScheduleApi(
    data: CreateScheduleReq
): Promise<CreateScheduleRes> {
  return axios.post<CreateScheduleRes>(
      `${SERVER}/schedule/create`,
      data,
      {withCredentials: true}
  ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

export async function updateScheduleApi(
    {id, ...data}: UpdateScheduleReq
) : Promise<UpdateScheduleRes> {
  return axios.patch<UpdateScheduleRes>(
      `${SERVER}/schedule/update/${id}`,
      data,
      {withCredentials: true}
  ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

export async function deleteScheduleApi(
    {id}: DeleteScheduleReq
) : Promise<DeleteScheduleRes> {
  return axios.delete<DeleteScheduleRes>(
      `${SERVER}/schedule/delete/${id}`,
      {withCredentials: true}
  ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};
