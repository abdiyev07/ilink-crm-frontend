<template>
  <DatePicker v-model="dates" :popover="{ visibility: 'click' }" is-range>
    <template v-slot="{ inputValue, togglePopover }">
      <div @click="togglePopover()" class="dates-range">
        <span v-show="!inputValue.start" class="dates-range__text">
          Выберите период
        </span>
        <span v-show="inputValue.start" class="dates-range__text_selected">
          {{ inputValue.start }} - {{ inputValue.end }}
          <span v-if="clearable" @click.stop="clearDate" class="q-ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </span>
        </span>
      </div>
    </template>
  </DatePicker>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

export default defineComponent({
  name: "CustomDatePicker",
  components: {
    DatePicker,
  },

  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const dates = ref(null);
    const currentDate = ref(new Date());
    // const date = new Date();
    // const minDate = date.setMonth(date.getMonth() - 1);

    const filterDate = (date: Date) => {
      if (date) {
        return new Intl.DateTimeFormat("kz-KZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
      }
    };

    const clearDate = () => {
      dates.value = null;
      emit("date-picked", dates.value);
    };

    watchEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (dates.value?.start) {
        emit("date-picked", dates.value);
        // emitPickedDateAndStopWatch();
      }
    });

    // const emitPickedDateAndStopWatch = () => {
    //   emit("date-picked", dates.value);
    //   watchDate();
    // };

    return {
      dates,
      currentDate,
      filterDate,
      clearDate,
    };
  },
});
</script>

<style lang="scss">
.dates-range {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem;
  color: grey;
  cursor: pointer;

  &__text {
    &_selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
    }
  }
}
</style>
