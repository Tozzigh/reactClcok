import React, { useState, useEffect } from "react";

function SecondsCounter() {
	var [seconds, setSeconds] = useState(0);
	var [minutes, setMinutes] = useState(0);
	var [hours, setHours] = useState(0);
	var [pauseStart, setPauseStart] = useState(false);
	useEffect(
		() => {
			if (pauseStart) {
				const id = setInterval(() => {
					setSeconds(seconds => {
						if (seconds < 60) {
							return seconds + 1;
						}
					});
				}, 1000);
				return () => clearInterval(id);
			}
		},
		[pauseStart]
	);

	useEffect(
		() => {
			if (seconds == 60) {
				setSeconds(seconds => (seconds = 0));
				setMinutes(minutes => {
					return minutes + 1;
				});
			}
		},
		[seconds]
	);
	useEffect(
		() => {
			if (minutes == 60) {
				setHours(hours => {
					setMinutes(minutes => (minutes = 0));
					return hours + 1;
				});
			}
		},
		[minutes]
	);
	return (
		<div className="clock">
			<div className="container-fluid">
				<div className="ciao fas fa-hourglass-half" />
				<div className="ciao">
					{hours.toString()[hours.toString().length - 2] || 0}
				</div>
				<div className="ciao">
					{hours.toString()[hours.toString().length - 1] || 0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{minutes.toString()[minutes.toString().length - 2] || 0}
				</div>
				<div className="ciao">
					{minutes.toString()[minutes.toString().length - 1] || 0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{seconds.toString()[seconds.toString().length - 2] || 0}
				</div>
				<div className="ciao">
					{seconds.toString()[seconds.toString().length - 1] || 0}
				</div>
			</div>
			<input
				type="number"
				className="countdown"
				placeholder="If u need a countdown, type here the start number"
				onKeyPress={countdown}
			/>
			{pauseStart ? (
				<button
					className="fa fa-pause"
					onClick={() => setPauseStart((pauseStart = false))}
				/>
			) : (
				<button
					className="fa fa-play"
					onClick={() => setPauseStart((pauseStart = true))}
				/>
			)}
			<button
				className="fa fa-redo"
				onClick={() => {
					setSeconds(seconds => (seconds = 0));
					setMinutes(minutes => (minutes = 0));
					setHours(hours => (hours = 0));
				}}
			/>
		</div>
	);
}
const countdown = evt => {
	if (evt.key === "e" || evt.key === "+" || evt.key === "-") {
		evt.preventDefault();
	}
};
export default SecondsCounter;
