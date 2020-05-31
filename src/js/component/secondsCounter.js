import React, { useState, useEffect } from "react";

const SecondsCounter = () => {
	var [clock, setClock] = useState("0000");
	var [clockStr, setClockStr] = useState([]);
	useEffect(() => {
		setInterval(() => {
			setClock(parseInt(clock++));
			setClockStr(clock.toString().split(""));
		}, 1000);
	}, []);

	return (
		<div className="clock">
			<div className="container-fluid">
				<div className="ciao fas fa-hourglass-half" />
				<div className="ciao">{clockStr[clockStr.length - 6]}</div>
				<div className="ciao">{clockStr[clockStr.length - 5]}</div>
				<div className="due">:</div>
				<div className="ciao">{clockStr[clockStr.length - 4]}</div>
				<div className="ciao">{clockStr[clockStr.length - 3]}</div>
				<div className="due">:</div>
				<div className="ciao">{clockStr[clockStr.length - 2]}</div>
				<div className="ciao">{clockStr[clockStr.length - 1]}</div>
			</div>
			<input
				type="number"
				className="countdown"
				placeholder="If u need a countdown, type here the start number"
				onKeyUp={countdown}
			/>
		</div>
	);
};
const countdown = evt => {
	if (
		(evt.which != 8 && evt.which != 0 && evt.which < 48) ||
		evt.which > 57
	) {
		evt.preventDefault();
	}
};
export default SecondsCounter;
