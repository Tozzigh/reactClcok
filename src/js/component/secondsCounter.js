import React, { useState, useEffect } from "react";

function SecondsCounter() {
	var [seconds, setSeconds] = useState(0);
	var [minutes, setMinutes] = useState(0);
	var [hours, setHours] = useState(0);
	var [pauseStart, setPauseStart] = useState(false);
	var [countdownOn, setCountdownOn] = useState(false);
	useEffect(
		() => {
			if (pauseStart && !countdownOn) {
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
			if (pauseStart && !countdownOn) {
				if (seconds == 60) {
					setSeconds(seconds => (seconds = 0));
					setMinutes(minutes => {
						return minutes + 1;
					});
				}
			}
		},
		[seconds]
	);
	useEffect(
		() => {
			if (pauseStart && !countdownOn) {
				if (minutes == 60) {
					setHours(hours => {
						setMinutes(minutes => (minutes = 0));
						return hours + 1;
					});
				}
			}
		},
		[minutes]
	);

	useEffect(
		() => {
			if (countdownOn) {
				const id = setInterval(() => {
					setSeconds(seconds => {
						if (seconds > 0) {
							return seconds - 1;
						} else if (seconds == 0) {
							return (seconds = 59);
						}
					});
				}, 1000);
				return () => clearInterval(id);
			}
		},
		[countdownOn]
	);
	useEffect(
		() => {
			if (countdownOn) {
				if (seconds == 0) {
					setSeconds(seconds => (seconds = 59));
					setMinutes(minutes => {
						return minutes - 1;
					});
				}
			}
		},
		[seconds]
	);
	useEffect(
		() => {
			if (countdownOn) {
				if (minutes == 0 && seconds == 0) {
					setHours(hours => {
						setMinutes(minutes => (minutes = 0));
						return hours - 1;
					});
				}
			}
		},
		[minutes]
	);

	const countdown = evt => {
		const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		var valueHolder = evt.target.value;
		if (!allowed.includes(evt.key)) {
			evt.preventDefault();
		}
		if (evt.key === "Enter" && evt.target.value !== "") {
			setSeconds((seconds = 0));
			setMinutes((minutes = 0));
			setHours((hours = 0));
			setCountdownOn((countdownOn = true));
			if (valueHolder.length < 3) {
				if (
					parseInt(
						valueHolder[valueHolder.length - 2] +
							valueHolder[valueHolder.length - 1]
					) > 59
				) {
					valueHolder = (parseInt(valueHolder) + 40).toString();
					setMinutes(
						(minutes = parseInt(
							(valueHolder[valueHolder.length - 4] || "0") +
								valueHolder[valueHolder.length - 3]
						))
					);
				}
				setSeconds((seconds = parseInt(valueHolder || "0")));
			} else if (
				evt.target.value.length > 2 &&
				evt.target.value.length < 5
			) {
				setSeconds(
					(seconds = parseInt(
						(evt.target.value[evt.target.value.length - 2] || "0") +
							evt.target.value[evt.target.value.length - 1]
					))
				);
				setMinutes(
					(minutes = parseInt(
						(evt.target.value[evt.target.value.length - 4] || "0") +
							evt.target.value[evt.target.value.length - 3]
					))
				);
			} else if (
				evt.target.value.length > 4 &&
				evt.target.value.length < 7
			) {
				setSeconds(
					(seconds = parseInt(
						(evt.target.value[evt.target.value.length - 2] || "0") +
							evt.target.value[evt.target.value.length - 1]
					))
				);
				setMinutes(
					(minutes = parseInt(
						(evt.target.value[evt.target.value.length - 4] || "0") +
							evt.target.value[evt.target.value.length - 3]
					))
				);
				setHours(
					(hours = parseInt(
						(evt.target.value[evt.target.value.length - 6] || "0") +
							evt.target.value[evt.target.value.length - 5]
					))
				);
			}
			evt.target.value = "";
		}
	};
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
				type="text"
				className="countdown"
				min="1"
				maxLength={6}
				placeholder="Final Countdown"
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
					setSeconds((seconds = 0));
					setMinutes((minutes = 0));
					setHours((hours = 0));
					setPauseStart((pauseStart = false));
					setCountdownOn((countdownOn = false));
				}}
			/>
		</div>
	);
}

export default SecondsCounter;
