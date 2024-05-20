"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useWavesurfer } from "@wavesurfer/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "./wave.scss";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("audio") || undefined;

  const options = useMemo(() => {
    let gradient, progressGradient;

    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      // Define the waveform gradient
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      container: containerRef,
      height: 100,
      waveColor: gradient,
      progressColor: progressGradient,
      url: search,
      barWidth: 2,
      // plugins: useMemo(() => [Timeline.create()], []),
    };
  }, []);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer(options);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const formatTime = (seconds: number) =>
    [seconds / 60, seconds % 60]
      .map((v) => `0${Math.floor(v)}`.slice(-2))
      .join(":");

  useEffect(() => {
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;

    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );
  }, []);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #493919, #42300b)",
        padding: "20px",
        height: "300px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "white",
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#f30",
              fontSize: "30px",
              color: "white",
              display: "inline-block",
              borderRadius: "50%",
              cursor: "pointer",
              alignSelf: "center",
              padding: "5px",
            }}
            onClick={onPlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </div>

          <div>
            <h4
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                padding: "5px",
                marginBottom: 2,
              }}
            >
              Đắng lòng chữ thương
            </h4>
            <p
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                display: "inline-block",
                padding: "5px",
                marginTop: 0,
              }}
            >
              Thành Đạt
            </p>
          </div>
        </div>

        <div ref={containerRef} className="wave-form-container">
          <div id="time">{formatTime(currentTime)}</div>
          <div id="hover" ref={hoverRef}></div>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(132, 97, 112), rgb(112, 146, 156))",
          width: "250px",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default WaveTrack;
