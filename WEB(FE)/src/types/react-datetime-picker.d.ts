declare module 'react-datetime-picker' {
  import type {CalendarProps} from 'react-calendar';

  export default function DateTimePicker(
    props: DateTimePickerProps
  ): JSX.Element;

  export interface DateTimePickerProps extends CalendarProps {
    amPmAriaLabel?: string;
    autoFocus?: boolean;
    calendarAriaLabel?: string;
    calendarClassName?: string | string[];
    calendarIcon?: JSX.Element | null;
    className?: string | string[];
    clearAriaLabel?: string;
    clearIcon?: JSX.Element | null;
    clockClassName?: string | string[];
    closeWidgets?: boolean;
    dayAriaLabel?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    disableCalendar?: boolean;
    disableClock?: boolean;
    format?: string;
    hourAriaLabel?: string;
    hourPlaceholder?: string;
    isCalendarOpen?: boolean;
    isClockOpen?: boolean;
    minuteAriaLabel?: string;
    minutePlaceholder?: string;
    monthAriaLabel?: string;
    monthPlaceholder?: string;
    name?: string;
    nativeInputAriaLabel?: string;
    onCalendarClose?: () => void;
    onCalendarOpen?: () => void;
    onChange?: ((val: Date | null) => void);
    onClockClose?: (() => void) | undefined;
    onClockOpen?: (() => void) | undefined;
    openCalendarOnFocus?: boolean;
    required?: boolean;
    secondAriaLabel?: string;
    secondPlaceholder?: string;
    showLeadingZeros?: boolean;
    yearAriaLabel?: string
    yearPlaceholder?: string;
  };
};
