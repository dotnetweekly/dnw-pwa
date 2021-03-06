<template>
  <div>
    <div class="columns constant-flex dnwCalendarHeader" v-if="filterCalendar && filterCalendar.weeks">
      <div class="column date-arrow is-one-quarter has-text-right is-pointer">
        <router-link
          v-bind:title="'Week ' + previousMonth.week "
          :to="'/week/' + previousMonth.week + '/year/' + previousMonth.year">
          <i class="icon-left-open" aria-hidden="true"></i>
        </router-link>
      </div>
      <div class="column has-text-centered">{{getCurrentMonth()}} {{filterYear}}</div>
      <div  class="column date-arrow is-one-quarter has-text-left is-pointer"
        v-if="isMonthInPast()">
        <router-link
          v-bind:title="'Week ' + nextMonth.week "
          :to="'/week/' + nextMonth.week + '/year/' + nextMonth.year">
          <i class="icon-right-open" aria-hidden="true"></i>
        </router-link>
      </div>
      <div class="column date-arrow is-one-quarter disabled-arrow"
        v-if="!isMonthInPast()">
        <i class="icon-right-open" aria-hidden="true"></i>
      </div>
    </div>
    <table class="dnwCalendar">
      <tbody>
        <tr class='dayNames'>
          <td> Week </td> <td>M</td> <td>T</td> <td>W</td>
          <td>T</td> <td>F</td> <td>S</td> <td>S</td>
        </tr>
        <tr v-if="filterCalendar && filterCalendar.weeks && isInPast(calendarWeek.week, calendarWeek.year)"
            v-for="(calendarWeek, index) in filterCalendar.weeks"
            v-bind:class="{
              dnwWeek: true,
              current: (calendarWeek.week == filterWeek),
              weekInPast: true,
              weekInFuture: false
            }"
             v-bind:key="index">
            <td>
                <router-link v-if="isInPast(calendarWeek.week, calendarWeek.year)"
                v-bind:title="'Week ' + calendarWeek.week "
                v-bind:alt="'Week ' + calendarWeek.week "
                :to="'/week/' + calendarWeek.week + '/year/' + calendarWeek.year">
                  {{calendarWeek.week}}
                </router-link>
            </td>
            <td v-if="calendarWeek && calendarWeek.days"
              v-for="(weekDay, dayIndex) in calendarWeek.days"
              v-bind:class="{
                dayInFuture: weekDay.inFuture,
                dayInPast: weekDay.inPast,
              }">
              <router-link
                v-bind:alt="'Week ' + weekDay.date ? weekDay.date.getDate() : '' "
                v-bind:title="'Week ' + calendarWeek.week "
              :to="'/week/' + calendarWeek.week + '/year/' + calendarWeek.year">
                {{ weekDay.date ? weekDay.date.getDate() : "" }}
              </router-link>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as calendarHelper from "../helpers/calendar";
export default {
  data() {
    return {
      previousMonth: { week: "", year: "" },
      nextMonth: { week: "", year: "" },
      filterCalendar: { weeks: [] }
    };
  },
  computed: {
    ...mapGetters("linksModule", [
      "filterCategory",
      "filterWeek",
      "filterYear",
      "serverWeek",
      "serverYear",
      "serverMonth",
      "serverDate"
    ]),
    filterWeekChange() {
      return this.filterWeek;
    }
  },
  watch: {
    filterWeekChange() {
      this.updateCalendar();
    }
  },
  mounted() {
    this.updateCalendar();
  },
  created() {
    this.updateCalendar();
  },
  methods: {
    updateCalendar() {
      this.filterCalendar = calendarHelper.getCalendar(
        this.filterWeek,
        this.filterYear
      );
      if (
        !this.filterCalendar ||
        !this.filterCalendar.weeks ||
        this.filterCalendar.weeks.length == 0
      ) {
        this.previousMonth = { week: "", year: "" };
        this.nextMonth = { week: "", year: "" };

        return;
      }

      const firstWeek = this.filterCalendar.weeks[0];
      let firstWeekFirstDay = new Date(firstWeek.days[0].date);
      firstWeekFirstDay.setHours(0, 0, 0, 0);
      firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() - 1);

      let previousWeekLastDay = new Date(firstWeekFirstDay);
      previousWeekLastDay.setHours(0, 0, 0, 0);
      this.previousMonth = {
        week: calendarHelper.getWeek(previousWeekLastDay),
        year: previousWeekLastDay.getFullYear()
      };

      const lastWeek = this.filterCalendar.weeks[
        this.filterCalendar.weeks.length - 1
      ];
      let lastWeekFirstDay = new Date(
        lastWeek.days[lastWeek.days.length - 1].date
      );
      lastWeekFirstDay.setHours(0, 0, 0, 0);
      lastWeekFirstDay.setDate(lastWeekFirstDay.getDate() + 1);

      let nextWeekFirstDay = new Date(lastWeekFirstDay);
      nextWeekFirstDay.setHours(0, 0, 0, 0);
      this.nextMonth = {
        week: calendarHelper.getWeek(nextWeekFirstDay),
        year: nextWeekFirstDay.getFullYear()
      };
    },
    getCurrentMonth() {
      if (!this.filterWeek || !this.filterYear) {
        return "";
      }
      return calendarHelper.getMonthName(
        calendarHelper.getMonthFromWeek(this.filterWeek, this.filterYear)
      );
    },
    isInPast(week, year) {
      if (!week || !year) {
        return false;
      }
      if (
        (week <= this.serverWeek && year == this.serverYear) ||
        year < this.serverYear
      ) {
        return true;
      }
      return false;
    },
    isMonthInPast() {
      if (!this.filterWeek || !this.filterYear) {
        return false;
      }

      let month = calendarHelper.getMonthFromWeek(
        this.filterWeek,
        this.filterYear
      );
      let year = this.filterYear;

      if (month === 11) {
        year = year + 1;
        month = 0;
      } else {
        month += 1;
      }

      if (this.serverYear > year) {
        return true;
      }

      if (this.serverYear == year && month <= this.serverMonth) {
        return true;
      }

      return false;
    },
    updatePath(week, year) {
      if (
        !this.$route.params ||
        !this.$route.params.week ||
        !this.$route.params.year
      ) {
        return;
      }

      if (week == this.$route.params.week && year == this.$route.params.year) {
        return;
      }

      if (this.filterCategory) {
        this.$router.push(`/${this.filterCategory}/week/${week}/year/${year}`);

        return;
      }
      this.$router.push(`/week/${week}/year/${year}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";

.dnwCalendarHeader {
  font-size: 16px;
}

@media screen and (max-width: $tablet-large) {
  .date-arrow {
    width: auto !important;
  }
  .dnwCalendarHeader {
    font-size: 16px;
  }
}

.main-menu a {
  color: $black;
}

.dnwCalendar {
  font-size: 16px;
}

table,
tr,
td {
  padding: 0 !important;
  text-align: center;
}

td a {
  padding: 0.5em !important;
  display: block;
}

.disabled-arrow,
tr.weekInFuture,
td.dayInPast,
td.dayInFuture {
  opacity: 0.5;
}

tr.weekInFuture td:first-child,
td.disabled {
  opacity: 0.3;
  font-style: italic;
  padding: 0.5em !important;
}

td.disabled {
  cursor: default;
  display: none;
}

tr.current,
tr.weekInPast:hover {
  background-color: $primary;
  color: #ffffff;
  a {
    color: $white;
  }
}

@media (min-width: $tablet) and (max-width: 1070px) {
  .dnwCalendarHeader,
  .dnwCalendar {
    font-size: 16px;
  }
  .content table td,
  .content table th,
  td a {
    padding: 0 !important;
  }
}
</style>
