import axios from 'axios';
import {
  CreatePlaceReq,
  CreatePlaceRes,
  CreateReservationReq,
  CreateReservationRes,
  DeletePlaceReq,
  DeletePlaceRes,
  DeleteReservationReq,
  DeleteReservationRes,
  GetPlaceByIdReq,
  GetPlaceListRes,
  UpdatePlaceReq,
  UpdatePlaceRes,
} from './types';
import {SERVER} from '@constants';

export async function getPlaceListApi() : Promise<GetPlaceListRes> {
  const res = await axios.get<GetPlaceListRes>(
      `${SERVER}/place`,
      {withCredentials: true},
  );
  return res.data;
};

export async function getPlaceByIdApi(
    {id}: GetPlaceByIdReq,
): Promise<GetPlaceListRes> {
  const res = await axios.get<GetPlaceListRes>(
      `${SERVER}/place/${id}`,
      {withCredentials: true},
  );
  return res.data;
};

export async function createPlaceApi(
    data: CreatePlaceReq,
): Promise<CreatePlaceRes> {
  const res = await axios.post<CreatePlaceRes>(
      `${SERVER}/place`,
      data,
      {withCredentials: true},
  );
  return res.data;
};

export async function updatePlaceApi(
    {id, ...data}: UpdatePlaceReq,
) : Promise<UpdatePlaceRes> {
  const res = await axios.patch<UpdatePlaceRes>(
      `${SERVER}/place/${id}`,
      data,
      {withCredentials: true},
  );
  return res.data;
};

export async function deletePlaceApi(
    {id}: DeletePlaceReq,
) : Promise<DeletePlaceRes> {
  const res = await axios.delete<DeletePlaceRes>(
      `${SERVER}/place/${id}`,
      {withCredentials: true},
  );
  return res.data;
};

export async function createReservationApi(
    data: CreateReservationReq,
): Promise<CreateReservationRes> {
  const res = await axios.post<CreateReservationRes>(
      `${SERVER}/reservation`,
      data,
      {withCredentials: true},
  );
  return res.data;
};

export async function deleteReservationApi(
    {id}: DeleteReservationReq,
) : Promise<DeleteReservationRes> {
  const res = await axios.delete<DeleteReservationRes>(
      `${SERVER}/reservation/${id}`,
      {withCredentials: true},
  );
  return res.data;
};
