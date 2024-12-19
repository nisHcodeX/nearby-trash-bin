import { InferenceResult } from "@core/interface";
import React, { FC, useEffect, useRef } from "react";
import { Button } from '@mui/material';

interface Props {
    data: InferenceResult;
    photo: string;
}

const ImageWithBorder: FC<Props> = ({ data, photo }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (data && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const scale = Math.min(400 / data.image.width, 400 / data.image.height);

                data.predictions.forEach((prediction) => {
                    const scaledX = (prediction.x - prediction.width / 2) * scale;
                    const scaledY = (prediction.y - prediction.height / 2) * scale;
                    const scaledWidth = prediction.width * scale;
                    const scaledHeight = prediction.height * scale;

                    ctx.strokeStyle = "green";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
                    ctx.fillStyle = "blue"; 
                    const text = `Trashbin (${(prediction.confidence * 100).toFixed(1)}%)`;
                    
                    const textWidth = ctx.measureText(text).width;
                    const textHeight = 14; 
                    
                    ctx.fillRect(scaledX + 5, scaledY + 15 - textHeight, textWidth + 10, textHeight + 5);
                    
                    ctx.fillStyle = "white";
                    ctx.font = "14px Arial";
                    
                    // Draw text on top of the background
                    ctx.fillText(text, scaledX + 5, scaledY + 15);
                    
                });
            }
        }
    }, [data]);

    if (!data) {
        return null;
    }
    const scale = Math.min(400 / data.image.width, 400 / data.image.height);

    return (
        <>
            <div style={{ position: "relative", width: 400, height: 'auto' }} className="m-2">
                <img
                    src={photo}
                    alt="Captured"
                    width={data.image.width * scale}
                    height={data.image.height * scale}
                    className="mb-2 rounded"
                    style={{ display: "block", objectFit: "contain" }}
                />
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                    }}
                />
            </div>
            <div className="p-4">
                <h4 className="text-success mb-2 d-flex">
                    System Has Detected{" "}
                    <div className="text-primary">&nbsp; {data.predictions.length} &nbsp; </div> bins
                </h4>
                <div className="d-flex justify-content-center mt-4">
                    <Button variant="outlined">Continue</Button>
                </div>
            </div>
        </>
    );
};

export default ImageWithBorder;
