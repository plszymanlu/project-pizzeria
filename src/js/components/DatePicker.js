// plugin flatpickr //

import { BaseWidget } from './BaseWidget.js';
import {settings, select} from '../settings.js';
import {utils} from '../utils.js';

export class DatePicker extends BaseWidget {
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();
  }

  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);
    console.log(thisWidget.value);

    flatpickr(thisWidget.dom.input, {
      deflaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1,
      },
      disable: [
        function(date){
          return (date.getDay() === 2);
        }
      ],
      onChange: function(selectedDates, dateStr){
        thisWidget.value = dateStr;
        console.log('selectedDates:', selectedDates);
        console.log('thisWidget.value:', thisWidget.value);
      }
    });
  }

  parseValue(newValue){
    return newValue;
  }

  isValid(){
    return true;
  }

  renderValue(){
  }
}
