import moment from "moment/moment";
import "moment/locale/ru";

function Calendar({ date }) {
  moment.locale("ru");
  const dayOfWeek = moment(date).format("dddd");
  const day = moment(date).format("D");
  const month = moment(date).format("D MMMM");
  const monthInfinitive = moment(date).format("MMMM");
  const year = moment(date).format("YYYY");

  const firstDayOfMonth = moment(date).startOf("month");
  const lastDayOfMonth = moment(date).endOf("month");
  const numberOfWeekForFirstDay = firstDayOfMonth.weekday();
  const numberOfWeekForLasttDay = lastDayOfMonth.weekday();
  const daysArray = [];

  //формируем список дней
  daysArray.push({
    number: firstDayOfMonth.add(-numberOfWeekForFirstDay, "days").format("D"),
    thisMonth: moment(date).startOf("month").weekday() === 0 ? true : false,
    current: false,
  });

  for (let i = 1; i <= numberOfWeekForFirstDay - 1; i++) {
    daysArray.push({
      number: firstDayOfMonth.add(1, "days").format("D"),
      thisMonth: false,
      current: false,
    });
  }

  //текущий месяц
  for (let i = 1; i <= moment(date).daysInMonth(); i++) {
    const number = firstDayOfMonth.add(1, "days").format("D");
    daysArray.push({
      number: number,
      thisMonth: true,
      current: number === day ? true : false,
    });
  }

  //следующий месяц
  for (let i = 1; i < 7 - numberOfWeekForLasttDay; i++) {
    daysArray.push({
      number: firstDayOfMonth.add(1, "days").format("D"),
      thisMonth: false,
      current: false,
    });
  }

  //массив из номеров недель месяца
  const weekArray = Array.from(
    { length: daysArray.length / 7 },
    (_, i) => i + 1
  );

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {UpperCaseTransform(dayOfWeek)}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">
            {month.split(" ")[1]}
          </div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {UpperCaseTransform(monthInfinitive)}
          </span>
          &nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>
          {weekArray.map((_, i) => {
            return (
              <tr>
                {daysArray.slice(i * 7, i * 7 + 7).map((day, j) => {
                  return (
                    <td
                      className={
                        day.thisMonth
                          ? day.current
                            ? "ui-datepicker-today"
                            : ""
                          : "ui-datepicker-other-month"
                      }
                    >
                      {day.number}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UpperCaseTransform(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export default Calendar;
