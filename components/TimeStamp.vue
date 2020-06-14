<template>
  <time :datetime="time">{{timeLine(time)}}</time>
</template>

<script>
import dayjs from 'dayjs';
import localeko from 'dayjs/locale/ko';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(localeko)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

export default {
  props: {
    time : String
  },
  methods: {
    timeLine(time){
      const past = dayjs(this.time);
      const now = dayjs();

      if (past.isSame(now, 'year')) { // 작성일과 현재년이 일치
        if (past > now.add(-1, 'month')) { // 작성일로부터 1개월 이하
          if (past.isSame(now, 'day')) { // 오늘
            if (past > now.add(-1, 'hour')) { // 작성일로부터 1시간 이하
              return now.to(past)
            }
            if (past > now.add(-1, 'minute')) { // 작성일로부터 1분 이하
              return '방금'
            }
            return now.to(past)
          }
          if(past.isYesterday()) { // 어제
            return past.format('어제 a hh:mm')
          }
          return past.format('M월 DD일 a h:mm')
        }
        return past.format('M월 DD일')
      }
      return past.format('YYYY. MM. DD')
    }
  }
}
</script>