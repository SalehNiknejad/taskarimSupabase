"use client";
import React from "react";
import { DatePicker } from "zaman";

function Datepicker() {
  return <DatePicker onChange={(e) => e.value} />;
}

export default Datepicker;
