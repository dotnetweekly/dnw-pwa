<template>
  <div>
    <div class="columns constant-flex dnwCalendarHeader">
      <div class="column date-arrow is-one-quarter has-text-right is-pointer"
        v-on:click="getPreviousMonth">
        <i class="icon-left-open" aria-hidden="true"></i>
      </div>
      <div class="column has-text-centered">{{getCurrentMonth()}} {{getCurrentYear()}}</div>
      <div  class="column date-arrow is-one-quarter has-text-left is-pointer"
        v-on:click="getNextMonth"
        v-show="isMonthInPast()">
        <i class="icon-right-open" aria-hidden="true"></i>
      </div>
      <div class="column date-arrow is-one-quarter disabled-arrow"
        v-show="!isMonthInPast()">
        <i class="icon-right-open" aria-hidden="true"></i>
      </div>
    </div>
    <table class="dnwCalendar">
      <tbody>
        <tr class='dayNames'>
          <td> Week </td> <td>M</td> <td>T</td> <td>W</td>
          <td>T</td> <td>F</td> <td>S</td> <td>S</td>
        </tr>
        <tr v-bind:class="{
              dnwWeek: true,
              current: isCurrentWeek(week.week),
              weekInPast: isInPast(week.week, week.year),
              weekInFuture: !isInPast(week.week, week.year)
            }"
            v-for="(week, index) in filterCalendar.weeks" v-bind:key="index">
          <td v-on:click="setNewDate(week.days[0].date)">{{week.week}}</td>
          <td v-for="(weekDay, dayIndex) in week.days"
              v-bind:class="{
                dayInFuture: weekDay.inFuture,
                dayInPast: weekDay.inPast,
                disabled: isDayDisabled(weekDay.date)
              }"
              v-on:click="setNewDate(weekDay.date)"
              v-bind:key="dayIndex">{{weekDay.date.getDate()}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import * as calendarHelper from "../helpers/calendar";
  export default {
    computed: {
      ...mapGetters("linksModule", [
        "filterDate",
        "filterCalendar",
        "filterCategory"
      ])
    },
    methods: {
      getCurrentMonth() {
        const date = new Date(this.filterDate);
        let month = date.getMonth();
        return calendarHelper.getMonthName(month);
      },
      getCurrentYear() {
        const date = new Date(this.filterDate);
        return date.getFullYear();
      },
      isCurrentWeek(week) {
        const weekNow = calendarHelper.getWeek(this.filterDate);
        console.log(weekNow, week, this.filterDate);
        if (week === weekNow) {
          return true;
        }
        return false;
      },
      isInPast(week, year) {
        const yearNow = new Date(Date.now()).getFullYear();
        const weekNow = calendarHelper.getWeek(Date.now());
        if ((week <= weekNow && year == yearNow) || year < yearNow) {
          return true;
        }
        return false;
      },
      isDayDisabled(date) {
        return (date - Date.now() > 0)
      },
      getNextMonth() {
        const lastWeek = this.filterCalendar.weeks[this.filterCalendar.weeks.length - 1];
        let lastWeekFirstDay = new Date(lastWeek.days[lastWeek.days.length - 1].date);
        lastWeekFirstDay.setDate(lastWeekFirstDay.getDate() + 1)

        if (lastWeekFirstDay > Date.now()) {
          lastWeekFirstDay = Date.now();
        }

        const date = new Date(lastWeekFirstDay);
        const week = calendarHelper.getWeek(date);
        const year = date.getFullYear();
        this.updatePath(week, year);
      },
      getPreviousMonth() {
        const firstWeek = this.filterCalendar.weeks[0];
        let firstWeekFirstDay = new Date(firstWeek.days[0].date);
        firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() - 1);

        const date = new Date(firstWeekFirstDay);
        const week = calendarHelper.getWeek(date);
        const year = date.getFullYear();
        this.updatePath(week, year);
      },
      isMonthInPast() {
        const date = new Date(this.filterDate);
        let month = date.getMonth();
        let year = date.getFullYear();

        const yearNow = new Date(Date.now()).getFullYear();
        const monthNow = new Date(Date.now()).getMonth();

        if (month === 11) {
          year = year + 1;
          month = 0;
        } else {
          month += 1;
        }

        if (year > yearNow || (yearNow <= year && month > monthNow)) {
          return false;
        }

        return true;
      },
      setNewDate(newDate) {
        if (this.isDayDisabled(newDate)) {
          return;
        }
        const date = new Date(newDate);
        const week = calendarHelper.getWeek(date);
        const year = date.getFullYear();
        this.updatePath(week, year);
      },
      updatePath(week, year) {
        if(week == this.$route.params.week && year == this.$route.params.year){
          return;
        }

        if (this.filterCategory) {
          this.$router.push(`/${this.filterCategory}/week/${week}/year/${year}`);

          return;
        }
        this.$router.push(`/week/${week}/year/${year}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";

@media screen and (max-width: $tablet-large) {
  .date-arrow{
    width: auto !important;
  }
  .dnwCalendarHeader {
    font-size: 80%;
  }
}

.dnwCalendar{
  font-size: 70%;
}

table, tr, td{
  padding-left: 0 !important;
  padding-right: 0 !important;
  text-align: center;
}

.disabled-arrow, tr.weekInFuture, td.dayInPast, td.dayInFuture{
  opacity: 0.5;
}

td.disabled{
  text-decoration: line-through;
  cursor: default;
}

tr.current, tr.weekInPast:hover{
  background-color: $primary;
  color: #ffffff;
  cursor: pointer;
}
</style>
