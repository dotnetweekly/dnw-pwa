<template>
  <div>
    <div class="columns constant-flex">
      <div class="column is-one-quarter has-text-right is-pointer"
        v-on:click="getPreviousMonth(filterCalendar.month, filterCalendar.year)">
        <i class="icon-left-open" aria-hidden="true"></i>
      </div>
      <div class="column has-text-centered">{{getMonth(filterCalendar.month)}} {{filterCalendar.year}}</div>
      <div  class="column is-one-quarter has-text-left is-pointer"
        v-on:click="getNextMonth(filterCalendar.month, filterCalendar.year)"
        v-show="isMonthInPast(filterCalendar.month, filterCalendar.year)">
        <i class="icon-right-open" aria-hidden="true"></i>
      </div>
      <div class="column is-one-quarter disabled-arrow"
        v-show="!isMonthInPast(filterCalendar.month, filterCalendar.year)">
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
        "filterDateYear",
        "filterDateWeek",
        "filterCategory"
      ])
    },
    methods: {
      ...mapActions("linksModule", {
        setFilterDate: "setFilterDate"
      }),
      getMonth(monthNum) {
        return calendarHelper.getMonthName(monthNum);
      },
      isCurrentWeek(week) {
        const weekNow = this.filterDateWeek;
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
      getNextMonth(month, year) {
        if (month === 12) {
          year = year + 1;
          month = 1;
        } else {
          month += 1;
        }
        this.setFilterDate(new Date(year, month, 1));
      },
      getPreviousMonth(month, year) {
        if (month === 1) {
          year = year - 1;
          month = 12;
        } else {
          month -= 1;
        }
        this.setFilterDate(new Date(year, month, 1));
        this.updatePath();
      },
      isMonthInPast(month, year) {
        const yearNow = new Date(Date.now()).getFullYear();
        const monthNow = new Date(Date.now()).getMonth();
        if (month === 12) {
          year = year + 1;
          month = 1;
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
        this.setFilterDate(newDate);
        this.updatePath();
      },
      updatePath() {
        if (this.filterCategory) {
          this.$router.push(`/${this.filterCategory}/week/${this.filterDateWeek}/year/${this.filterDateYear}`);

          return;
        }
        this.$router.push(`/week/${this.filterDateWeek}/year/${this.filterDateYear}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";
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
