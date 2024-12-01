import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

export default function BookingSection({ place }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  let numNight = 0;
  if (checkInDate && checkOutDate) {
    numNight = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between">
      <div className="text-4xl font-bold text-gray-800">
        ${place.price}/night 🌙
      </div>
      <label className="text-sm font-normal mt-4">
        <span className="font-semibold">Select Check-In:</span>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 "
        />
      </label>
      <label className="text-sm  mt-4">
        <span className="font-semibold">Select Check-In:</span>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300"
        />
      </label>
      {numNight > 0 && (
        <div className="flex space-x-4 mt-4">
          <label className="text-sm w-full">
            <span className="font-semibold">Your Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </label>

          <label className="text-sm w-full">
            <span className="font-semibold">Your Mobile:</span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </label>
        </div>
      )}
      <div className="mt-2">
        {numNight > 0 && (
          <span className="font-semibold text-lg rounded-lg w-26 bg-red-500 text-white px-2 py-1">
            <span>Total: ${numNight * place.price}</span>
          </span>
        )}
      </div>
    </div>
  );
}
