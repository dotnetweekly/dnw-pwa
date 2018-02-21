<template>
  <div>
    <div class="columns constant-flex dnwCalendarHeader" v-if="filterCalendar && filterCalendar.weeks">
      <div class="column date-arrow is-one-quarter has-text-right is-pointer"
        v-on:click="getPreviousMonth(true)">
        <router-link
          :to="'/week/' + getPreviousMonth().week + '/year/' + getPreviousMonth().year">
          <i class="icon-left-open" aria-hidden="true"></i>
        </router-link>
      </div>
      <div class="column has-text-centered">{{getCurrentMonth()}} {{getCurrentYear()}}</div>
      <div  class="column date-arrow is-one-quarter has-text-left is-pointer"
        v-on:click="getNextMonth(true)"
        v-show="isMonthInPast()">
        <router-link
          :to="'/week/' + getNextMonth().week + '/year/' + getNextMonth().year">
          <i class="icon-right-open" aria-hidden="true"></i>
        </router-link>
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
        <tr v-if="filterCalendar && filterCalendar.weeks"
            v-for="(week, index) in filterCalendar.weeks"
            v-bind:class="{
              dnwWeek: true,
              current: isCurrentWeek(week.week) || false,
              weekInPast: isInPast(week.week, week.year) || false,
              weekInFuture: !isInPast(week.week, week.year) || false
            }"
             v-bind:key="index">
            <td v-on:click="setNewDate(week.days[0].date)">
                <router-link v-if="isInPast(week.week, week.year)"
                :to="'/week/' + week.week + '/year/' + week.year">
                  {{week.week}}
                </router-link>
                <span v-if="!isInPast(week.week, week.year)">{{week.week}}</span>
            </td>
            <td v-for="(weekDay, dayIndex) in week.days"
              v-bind:class="{
                dayInFuture: weekDay.inFuture || false,
                dayInPast: weekDay.inPast || false,
                disabled: isDayDisabled(weekDay.date) || false
              }"
              v-on:click="setNewDate(weekDay.date)"
              v-bind:key="dayIndex">
              <router-link v-if="!isDayDisabled(weekDay.date)"
              :to="'/week/' + getDateWeek(weekDay.date) + '/year/' + getDateYear(weekDay.date)">
                {{weekDay.date.getDate()}}
              </router-link>
              <span v-if="isDayDisabled(weekDay.date)">{{weekDay.date.getDate()}}</span>
            </td>
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
        try{
          if (!this.filterDate) {
            return "";
          }
          let date = new Date(this.filterDate);
          date.setHours(0,0,0,0);
          let month = date.getMonth();
          return calendarHelper.getMonthName(month);
        }catch(error){
          return "";
        }
      },
      getCurrentYear() {
        try{
          if (!this.filterDate) {
            return "";
          }
          let date = new Date(this.filterDate);
          date.setHours(0,0,0,0);
          return date.getFullYear();
        }catch(error){
          return "";
        }
      },
      isCurrentWeek(week) {
        try{
          if (!week || !this.filterDate) {
            return false;
          }
          const weekNow = calendarHelper.getWeek(this.filterDate);
          if (week === weekNow) {
            return true;
          }
          return false;
        } catch(error) {
          return false;
        }
      },
      isInPast(week, year) {
        try{
          if (!week || !year) {
            return false;
          }
          const yearNow = new Date(Date.now()).getFullYear();
          const weekNow = calendarHelper.getWeek(Date.now());
          if ((week <= weekNow && year == yearNow) || year < yearNow) {
            return true;
          }
          return false;
        } catch(error) {
          return false;
        }
      },
      isDayDisabled(date) {
        try{
          if (!date) {
            return false;
          }
          return (date - Date.now() > 0)
        }catch(error) {
          return false;
        }
      },
      getNextMonth(action) {
        try{
          if (!this.filterCalendar || !this.filterCalendar.weeks) {
            return { week: "", year: ""};
          }
          if (this.filterCalendar.weeks.length === 0) {
            return { week: "", year: ""};
          }

          const lastWeek = this.filterCalendar.weeks[this.filterCalendar.weeks.length - 1];
          let lastWeekFirstDay = new Date(lastWeek.days[lastWeek.days.length - 1].date);
          lastWeekFirstDay.setHours(0,0,0,0);
          lastWeekFirstDay.setDate(lastWeekFirstDay.getDate() + 1)

          if (lastWeekFirstDay > Date.now()) {
            lastWeekFirstDay = Date.now();
          }

          let date = new Date(lastWeekFirstDay);
          date.setHours(0,0,0,0);
          const week = calendarHelper.getWeek(date);
          const year = date.getFullYear();
          if (action) {
            this.updatePath(week, year);
          }
          return { week, year }
        }catch(error){
          return { week: "", year: ""};
        }
      },
      getPreviousMonth(action) {
        try{
          if (!this.filterCalendar || !this.filterCalendar.weeks) {
            return { week: "", year: ""};
          }
          if (this.filterCalendar.weeks.length === 0) {
            return { week: "", year: ""};
          }
          const firstWeek = this.filterCalendar.weeks[0];
          let firstWeekFirstDay = new Date(firstWeek.days[0].date);
          firstWeekFirstDay.setHours(0,0,0,0);
          firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() - 1);

          let date = new Date(firstWeekFirstDay);
          date.setHours(0,0,0,0);
          const week = calendarHelper.getWeek(date);
          const year = date.getFullYear();
          if (action) {
            this.updatePath(week, year);
          }
          return { week, year }
        }catch(error){
            return { week: "", year: ""};
        }
      },
      isMonthInPast() {
        try{
          if (!this.filterDate) {
            return;
          }
          let date = new Date(this.filterDate);
          date.setHours(0,0,0,0);

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
        }catch(error){
          return true;
        }
      },
      getDateWeek(newDate) {
        try{
          if (!newDate) {
            return;
          }
          return calendarHelper.getWeek(new Date(newDate));
        }catch(error){
          return "";
        }
      },
      getDateYear(newDate) {
        try{
          if(!newDate){
            return;
          }
          return (new Date(newDate)).getFullYear();
        }catch(error){
          return "";
        }
      },
      setNewDate(newDate) {
        try{
          if(!newDate){
            return;
          }
          if (this.isDayDisabled(newDate)) {
            return "";
          }
          const date = new Date(newDate);
          const week = calendarHelper.getWeek(date);
          const year = date.getFullYear();
          this.updatePath(week, year);
        }catch(error){
          return "";
        }
      },
      updatePath(week, year) {
        try{
          if(!this.$route.params || !this.$route.params.week || !this.$route.params.year){
            return;
          }

          if(week == this.$route.params.week && year == this.$route.params.year){
            return;
          }

          if (this.filterCategory) {
            this.$router.push(`/${this.filterCategory}/week/${week}/year/${year}`);

            return;
          }
          this.$router.push(`/week/${week}/year/${year}`);
        }catch(error){
          return "";
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";

.dnwCalendarHeader {
  font-size: 90%;
}

@media screen and (max-width: $tablet-large) {
  .date-arrow{
    width: auto !important;
  }
  .dnwCalendarHeader {
    font-size: 80%;
  }
}

.main-menu a {
  color: $black;
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
  a {
    color: $white;
  }
}
</style>
