import { useEffect, useMemo, useRef, useState } from "react";

import "./Progressbar.css";

const TARGET_COUNT = 100;
const MS = 1000;

const ProgressBar = () => {
	const [duration, setDuration] = useState(5);
	const [isRunning, setIsRunning] = useState(false);
	const [width, setWidth] = useState(0);

	const timerRef = useRef(null);

	const intervalSpeed = useMemo(
		() => (duration * MS) / TARGET_COUNT,
		[duration],
	);

	const isDisabled = useMemo(() => isRunning && width !== TARGET_COUNT, []);

	useEffect(() => {
		if (isRunning) {
			timerRef.current = setInterval(() => {
				if (width < TARGET_COUNT) {
					setWidth((prev) => prev + 1);
				} else {
					clearInterval(timerRef.current);
					return TARGET_COUNT;
				}
			}, intervalSpeed);
		}

		return () => clearInterval(timerRef.current);
	}, [intervalSpeed, isRunning, width]);

	const handleDurationChange = (event) => {
		const { value } = event.target;
		setDuration(value);
	};

	const handleResetTimer = () => {
		setWidth(0);
		setIsRunning(false);
	};

	const handleStartTimer = () => {
		setIsRunning(true);
	};

	const handleResumeTimer = () => {
		setIsRunning(true);
	};

	const handlePauseTimer = () => {
		setIsRunning(false);
	}

	return (
		<>
			<div className="progressbar-container">
				<input
					min={1}
					disabled={isDisabled}
					type="number"
					value={duration}
					className="input-duration"
					onChange={handleDurationChange}
				/>
				<button
					onClick={handleStartTimer}
					disabled={isDisabled}
					className="cta-button"
				>
					Start
				</button>
				<button onClick={handlePauseTimer} className="cta-button">
					Pause
				</button>
				<button onClick={handleResumeTimer} className="cta-button">
					Resume
				</button>
				<button onClick={handleResetTimer} className="cta-button">
					Reset
				</button>
			</div>
			<div className="progressbar-controls">
				<div
					className="progress-fill"
					style={{
						width: `${width}%`,
						transition: isRunning ? `width linear ${duration}s` : "none",
					}}
				></div>
				<span className="progressbar-text">{`${width}%`}</span>
			</div>
		</>
	);
};

export default ProgressBar;
