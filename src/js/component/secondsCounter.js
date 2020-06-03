import React, { useState, useEffect } from "react";

function SecondsCounter() {
	var [time, setTime] = useState({ seconds: 59, minutes: 59, hours: 59 });

	var [pauseStart, setPauseStart] = useState(false);
	var [countdownOn, setCountdownOn] = useState(false);
	useEffect(
		() => {
			if (pauseStart && !countdownOn) {
				const id = setInterval(() => {
					if (time.seconds < 59) {
						setTime(time => {
							return { ...time, seconds: time.seconds + 1 };
						});
					} else if (time.seconds == 59 && time.minutes < 59) {
						setTime(time => {
							return {
								...time,
								minutes: time.minutes + 1,
								seconds: 0
							};
						});
					} else if (time.seconds == 59 && time.minutes == 59) {
						setTime(time => {
							return {
								...time,
								minutes: 0,
								seconds: 0,
								hours: time.hours + 1
							};
						});
					}
				}, 1000);
				return () => clearInterval(id);
			}
		},
		[pauseStart, time.seconds, time.minutes, time.hours]
	);
	const countdown = evt => {
		const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		if (!allowed.includes(evt.key)) {
			evt.preventDefault();
		}
		if (evt.key === "Enter" && evt.target.value !== "") {
			setTime((time = 0));
			setCountdownOn((countdownOn = true));
		}
	};
	return (
		<div className="clock">
			<div className="container-fluid">
				<div className="ciao fas fa-hourglass-half" />
				<div className="ciao">
					{time.hours.toString()[time.hours.toString().length - 2] ||
						0}
				</div>
				<div className="ciao">
					{time.hours.toString()[time.hours.toString().length - 1] ||
						0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{time.minutes.toString()[
						time.minutes.toString().length - 2
					] || 0}
				</div>
				<div className="ciao">
					{time.minutes.toString()[
						time.minutes.toString().length - 1
					] || 0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{time.seconds.toString()[
						time.seconds.toString().length - 2
					] || 0}
				</div>
				<div className="ciao">
					{time.seconds.toString()[
						time.seconds.toString().length - 1
					] || 0}
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
					setTime(time => {});

					setPauseStart((pauseStart = false));
					setCountdownOn((countdownOn = false));
				}}
			/>
		</div>
	);
}

export default SecondsCounter;
