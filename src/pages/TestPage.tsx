import React from 'react';

import {
    RecordWebcam,
    useRecordWebcam,
    CAMERA_STATUS
} from "react-record-webcam";
import type {
    WebcamRenderProps,
    RecordWebcamOptions,
    RecordWebcamHook
} from "react-record-webcam";
import "./styles.css";

const OPTIONS: RecordWebcamOptions = {
    filename: "test-filename",
    fileType: "mp4",
    width: 1920,
    height: 1080
};

export const TestPage = () => {
    const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        console.log({ blob });
    };

    const getRecordingFileRenderProp = async (blob: Blob | undefined) => {
        console.log({ blob });
    };
    return (
        <div className="demo-section">
            <h1>Hooks demo</h1>
            <p>Camera status: {recordWebcam.status}</p>
            <div>
                <button
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.OPEN ||
                        recordWebcam.status === CAMERA_STATUS.RECORDING ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.open}
                >
                    Open camera
                </button>
                <button
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.CLOSED ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.close}
                >
                    Close camera
                </button>
                <button
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.CLOSED ||
                        recordWebcam.status === CAMERA_STATUS.RECORDING ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.start}
                >
                    Start recording
                </button>
                <button
                    disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
                    onClick={recordWebcam.stop}
                >
                    Stop recording
                </button>
                <button
                    disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                    onClick={recordWebcam.retake}
                >
                    Retake
                </button>
                <button
                    disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                    onClick={recordWebcam.download}
                >
                    Save Workout
                </button>
                <button
                    disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
                    onClick={getRecordingFileHooks}
                >
                    Get recording
                </button>
            </div>

            <video
                ref={recordWebcam.webcamRef}
                style={{
                    display: `${recordWebcam.status === CAMERA_STATUS.OPEN ||
                        recordWebcam.status === CAMERA_STATUS.RECORDING
                        ? "block"
                        : "none"
                        }`
                }}
                //autoPlay
                muted
                controls
            />
            <video
                ref={recordWebcam.previewRef}
                style={{
                    display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
                        }`
                }}
                //autoPlay
                muted
                loop
                controls
            />
        </div>
    );
};