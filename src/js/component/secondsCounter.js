import React, { useState, useEffect } from "react";

function SecondsCounter() {
	var [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
	var [pauseStart, setPauseStart] = useState(false);
	var [countdownOn, setCountdownOn] = useState(false);
	var [timeOut, setTimeOut] = useState(false);

	useEffect(
		() => {
			if (document.hasFocus()) {
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
				if (pauseStart && countdownOn) {
					const idd = setInterval(() => {
						if (time.seconds > 0) {
							setTime(time => {
								return { ...time, seconds: time.seconds - 1 };
							});
						} else if (time.seconds == 0 && time.minutes > 0) {
							setTime(time => {
								return {
									...time,
									seconds: 59,
									minutes: time.minutes - 1
								};
							});
						} else if (time.seconds == 0 && time.minutes == 0) {
							setTime(time => {
								return {
									...time,
									minutes: 59,
									seconds: 59,
									hours: time.hours - 1
								};
							});
						}
						if (
							time.hours == 0 &&
							time.minutes == 0 &&
							time.seconds == 0
						) {
							setTimeOut((timeOut = true));
						}
					}, 1000);
					return () => clearInterval(idd);
				}
			}
		},
		[pauseStart, countdownOn, time.seconds, time.minutes, time.hours]
	);
	const countdown = evt => {
		const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		if (!allowed.includes(evt.key)) {
			evt.preventDefault();
		}
		if (
			evt.key === "Enter" &&
			evt.target.value !== "" &&
			parseInt(evt.target.value) <= 995959
		) {
			var countdownNumber = parseInt(evt.target.value);
			if (parseInt(countdownNumber.toString().slice(-2)) > 59) {
				countdownNumber = countdownNumber + 40;
			}
			if (parseInt(countdownNumber.toString().slice(-4, -2)) > 59) {
				countdownNumber = countdownNumber + 4000;
			}
			setTime(time => {
				return {
					...time,
					seconds:
						parseInt(countdownNumber.toString().slice(-2)) || 0,
					minutes:
						parseInt(countdownNumber.toString().slice(-4, -2)) || 0,
					hours:
						parseInt(countdownNumber.toString().slice(-6, -4)) || 0
				};
			});
			setPauseStart((pauseStart = true));
			setCountdownOn((countdownOn = true));
		}
	};
	return (
		<>
			{!timeOut ? (
				<div className="clock">
					<div className="container-fluid">
						<div className="ciao fas fa-hourglass-half" />
						<div className="ciao">
							{time.hours.toString()[
								time.hours.toString().length - 2
							] || 0}
						</div>
						<div className="ciao">
							{time.hours.toString()[
								time.hours.toString().length - 1
							] || 0}
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
						placeholder="Add a number and press Enter for the final Countdown!"
						onKeyPress={countdown}
					/>
					<span>Max input 99:59:59</span>
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
							setTime(time => {
								return {
									...time,
									seconds: 0,
									minutes: 0,
									hours: 0
								};
							});

							setPauseStart((pauseStart = false));
							setCountdownOn((countdownOn = false));
						}}
					/>
				</div>
			) : (
				<div className="timeOut">
					<h1>!!! TIME RAN OUT !!!</h1>
					<button
						className="fa fa-redo"
						onClick={() => {
							setTime(time => {
								return {
									...time,
									seconds: 0,
									minutes: 0,
									hours: 0
								};
							});
							setPauseStart((pauseStart = false));
							setCountdownOn((countdownOn = false));
							setTimeOut((timeOut = false));
						}}
					/>
				</div>
			)}
		</>
	);
}

export default SecondsCounter;
