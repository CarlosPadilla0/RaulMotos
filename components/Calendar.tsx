import React, { useState, useMemo, useEffect } from 'react';

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

const ArrowIcon: React.FC<{ direction: 'left' | 'right', className?: string }> = ({ direction, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || 'w-6 h-6'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === 'left' ? "M15.75 19.5 8.25 12l7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
    />
  </svg>
);

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const nextMonday = useMemo(() => {
    const date = new Date(today);
    const day = date.getDay();
    const daysUntilMonday = (8 - day) % 7 || 7; 
    date.setDate(date.getDate() + daysUntilMonday);
    return date;
  }, [today]);

  const getInitialDate = () => {
    if (selectedDate) return new Date(selectedDate + 'T00:00:00');
    return today;
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());

  useEffect(() => {
    if (!selectedDate) setCurrentDate(nextMonday);
  }, [selectedDate, nextMonday]);

  const lastAvailableDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(today.getDate() + 14);
    return date;
  }, [today]);

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    if (date >= today && date <= lastAvailableDate && date.getDay() !== 0) {
      onDateSelect(date.toISOString().split('T')[0]);
    }
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + amount);
      return newDate;
    });
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const isPrevMonthDisabled = useMemo(() => {
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfTodayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstDayOfCurrentMonth <= firstDayOfTodayMonth;
  }, [currentDate, today]);

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const loopDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      loopDate.setHours(0, 0, 0, 0);

      const isUnavailable = loopDate < today || loopDate > lastAvailableDate || loopDate.getDay() === 0;
      const isSelected = selectedDate === loopDate.toISOString().split('T')[0];
      const isSuggested = loopDate.getTime() === nextMonday.getTime();

      let dayClasses = "w-10 h-10 flex items-center justify-center rounded-full text-sm ";
      if (isUnavailable) {
        dayClasses += "text-gray-600 bg-gray-200 cursor-not-allowed";
      } else {
        dayClasses += "cursor-pointer transition-colors ";
        if (isSelected) {
          dayClasses += "bg-coppel-blue text-white font-bold";
        } else if (isSuggested && !selectedDate) {
          dayClasses += "bg-green-500 text-white";
        } else {
          dayClasses += "bg-coppel-blue/40 text-coppel-blue hover:bg-coppel-blue/40";
        }
      }

      days.push(
        <div key={day} className={dayClasses} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
          disabled={isPrevMonthDisabled}
        >
          <ArrowIcon direction="left" />
        </button>
        <div className="font-bold text-lg text-gray-800">
          {currentDate.toLocaleString('es-MX', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
        </div>
        <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100">
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        <div>Dom</div><div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-600">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span>Fecha Sugerida</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-coppel-blue/40 mr-2"></span>
          <span>Fechas Disponibles</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-100 border mr-2"></span>
          <span>Fecha no disponible</span>
        </div>
      </div>
    </div>
  );
};
