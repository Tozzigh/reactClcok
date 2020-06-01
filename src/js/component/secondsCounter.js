import React, { useState, useEffect } from "react";

function SecondsCounter() {
	var [clock, setClock] = useState(58);
	var [stopResume, setStopResume] = useState(false);

	useEffect(() => {
		const count = setInterval(() => {
			if (
				clock.toString()[clock.toString().length - 1] === "0" &&
				clock.toString()[clock.toString().length - 2] === "6"
			) {
				setClock(clock => clock + 40);
			} else {
				setClock(clock => clock + 1);
			}
		}, 1000);
	}, []);
	useEffect(
		() => {
			console.log(
				clock.toString()[clock.toString().length - 1] === "0" &&
					clock.toString()[clock.toString().length - 2] === "6"
			);
		},
		[clock]
	);
	return (
		<div className="clock">
			<div className="container-fluid">
				<div className="ciao fas fa-hourglass-half" />
				<div className="ciao">
					{clock.toString()[clock.toString().length - 6] || 0}
				</div>
				<div className="ciao">
					{clock.toString()[clock.toString().length - 5] || 0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{clock.toString()[clock.toString().length - 4] || 0}
				</div>
				<div className="ciao">
					{clock.toString()[clock.toString().length - 3] || 0}
				</div>
				<div className="due">:</div>
				<div className="ciao">
					{clock.toString()[clock.toString().length - 2] || 0}
				</div>
				<div className="ciao">
					{clock.toString()[clock.toString().length - 1] || 0}
				</div>
			</div>
			<input
				type="number"
				className="countdown"
				placeholder="If u need a countdown, type here the start number"
				onKeyPress={countdown}
			/>
			<button onClick={() => setStopResume(true)} />
		</div>
	);
}
const countdown = evt => {
	if (evt.key === "e" || evt.key === "+" || evt.key === "-") {
		evt.preventDefault();
	}
};
export default SecondsCounter;
