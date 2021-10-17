import moment from "moment";

/**
 * dateString을 받아서, 일정한 포멧에 맞게 반환하는 함수\
 * 3일 기준으로 상대 시각 / 절대 시각으로 변환
 * @param dateTimeStr
 * @returns
 */
export function formatDateTime(dateTimeStr: string) {
  const korTime = moment(dateTimeStr).subtract(9, 'hours')
  const timeDiff = moment().diff(moment(korTime));
  const basisDuration = moment.duration(3, 'days').as('milliseconds');

  return timeDiff > basisDuration ?
    moment(korTime).format('MM/DD hh:mm') :
    moment(korTime).fromNow();
}