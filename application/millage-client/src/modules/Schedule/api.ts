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
  const res = await axios.get<GetScheduleListRes>(
      `${SERVER}/schedule/personal`,
      {withCredentials: true},
  );
  return res.data;
};

export async function getUnitScheduleListApi(): Promise<GetScheduleListRes> {
  const res = await axios.get<GetScheduleListRes>(
      `${SERVER}/schedule/recentUnit`,
      {withCredentials: true},
  );
  return res.data;
};

export async function createScheduleApi(
    data: CreateScheduleReq,
): Promise<CreateScheduleRes> {
  const res = await axios.post<CreateScheduleRes>(
      `${SERVER}/schedule`,
      data,
      {withCredentials: true},
  );
  return res.data;
};

export async function updateScheduleApi(
    {id, ...data}: UpdateScheduleReq,
) : Promise<UpdateScheduleRes> {
  const res = await axios.patch<UpdateScheduleRes>(
      `${SERVER}/schedule/${id}`,
      data,
      {withCredentials: true},
  );
  return res.data;
};

export async function deleteScheduleApi(
    {id}: DeleteScheduleReq,
) : Promise<DeleteScheduleRes> {
  const res = await axios.delete<DeleteScheduleRes>(
      `${SERVER}/schedule/${id}`,
      {withCredentials: true},
  );
  return res.data;
};
