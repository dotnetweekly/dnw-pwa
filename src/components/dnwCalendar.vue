<template>
  <div>
    <div>
      <div v-on:click="getPreviousMonth(filterCalendar.month, filterCalendar.year)"><i class="icon-left-open" aria-hidden="true"></i></div>
      <div>{{getMonth(filterCalendar.month)}}::{{filterCalendar.year}}</div>
      <div v-on:click="getNextMonth(filterCalendar.month, filterCalendar.year)"><i class="icon-right-open" aria-hidden="true"></i></div>
    </div>
    <table>
      <tbody>
        <tr class='dayNames'> <td> Week </td> <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> <td>Sun</td> </tr>
        <tr v-bind:class="{ dnwWeek: true, current: isCurrentWeek(week.week) }"
            v-for="(week, index) in filterCalendar.weeks" v-bind:key="index">
          <td>{{week.week}}</td>
          <td v-for="(weekDay, dayIndex) in week.days"
              v-on:click="setNewDate(weekDay.date)"
              v-bind:key="dayIndex">{{weekDay.date.getDate()}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  // Bug OCTOBER 2015
  import { mapGetters, mapActions } from "vuex";
  import * as calendarHelper from "../helpers/calendar";
  export default {
    computed: {
      ...mapGetters("linksModule", ["filterDate", "filterCalendar"])
    },
    methods: {
      ...mapActions("linksModule", {
        setFilterDate: "setFilterDate"
      }),
      getMonth(monthNum) {
        return calendarHelper.getMonthName(monthNum);
      },
      getPreviousMonth(month, year) {
        if (month === 1) {
          year = year - 1;
          month = 12;
        } else {
          month -= 1;
        }
        this.setFilterDate(new Date(year, month, 1));
      },
      isCurrentWeek(week) {
        const currentDateWeek = calendarHelper.getWeek(this.filterDate);
        console.log(currentDateWeek, week);
        if (currentDateWeek === week) {
          return true;
        }
        return false;
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
      setNewDate(newDate) {
        if (newDate - Date.now() > 0) {
          return;
        }
        this.setFilterDate(newDate);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";
.dnwWeek {
  cursor: pointer;
}
tr.current, .dnwWeek:hover{
  background-color: $primary;
  color: #ffffff;
}
</style>
