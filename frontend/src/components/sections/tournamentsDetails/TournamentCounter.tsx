"use client";

import Countdown from "react-countdown";

const TournamentCounter = ({ date }: { date: number }) => {
  const CountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return <h2 className="my-text-32">Event is Over</h2>;
    } else {
      return (
        <div className="countdown flex items-center gap-3 py-16p">
          <div>
            <span className="days text-m-medium text-white">{days}</span>
            <span className="text-xs text-white">Days</span>
          </div>
          <span className="text-primary icon-24">:</span>
          <div>
            <span className="hours text-m-medium text-white">{hours}</span>
            <span className="text-xs text-white">Hours</span>
          </div>
          <span className="text-primary icon-24">:</span>
          <div>
            <span className="minutes text-m-medium text-white">{minutes}</span>
            <span className="text-xs text-white">Minutes</span>
          </div>
          <span className="text-primary icon-24">:</span>
          <div>
            <span className="seconds text-m-medium text-white">{seconds}</span>
            <span className="text-xs text-white">Seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <Countdown date={date} renderer={CountdownRenderer}>
      <h4>Time Over</h4>
    </Countdown>
  );
};

export default TournamentCounter;
