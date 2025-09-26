import React, { useState, useRef, useEffect } from "react";
import "./VoiceNotes.css";

export default function VoiceNotes() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // start fresh on reload
  const [emergency, setEmergency] = useState(false);
  const recognitionRef = useRef(null);

  // Clear old transcript from localStorage on page reload
  useEffect(() => {
    localStorage.removeItem("transcript");
  }, []);

  // Save transcript to localStorage whenever it changes
  useEffect(() => {
    if (transcript) localStorage.setItem("transcript", transcript);
  }, [transcript]);

  const startRecording = () => {
    setRecording(true);
    setEmergency(false);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let currentTranscript = transcript; // accumulate previous transcript
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + " ";
        }
        setTranscript(currentTranscript);

        // Emergency detection
        const redFlags = [
          "suicide",
          "kill myself",
          "end my life",
          "hurt myself",
          "can't go on",
          "die",
          "worthless",
        ];
        const detected = redFlags.some((phrase) =>
          currentTranscript.toLowerCase().includes(phrase)
        );
        setEmergency(detected);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const clearTranscript = () => {
    setTranscript("");
    localStorage.removeItem("transcript");
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="voice-notes-wrapper">
      {/* Left Panel */}
      <div className="left-panel">
        <h1 className="title">🎙️ Voice Notes</h1>
        <p className="subtitle">
          Record your thoughts. <br />
          Get instant transcripts. <br />
          Stay safe with built-in wellbeing alerts.
        </p>
        {recording && <div className="mic-wave"></div>}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="transcript-panel">
          <h2>Transcript</h2>
          <p>{transcript || "🎤 Press record and start speaking..."}</p>
        </div>

        {emergency && (
          <div className="emergency-alert">
            <h3>🚨 Emergency Alert</h3>
            <p>
              Harmful language detected. Please reach out to a trusted friend,
              family member, or professional. If in immediate danger, call your
              local emergency number.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="controls">
          {!recording ? (
            <button className="mic-btn record" onClick={startRecording}>
              🎤
            </button>
          ) : (
            <button className="mic-btn stop" onClick={stopRecording}>
              ⏹
            </button>
          )}
          <button className="mic-btn save" onClick={downloadTranscript}>
            💾
          </button>
          <button className="mic-btn clear" onClick={clearTranscript}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
