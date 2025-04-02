/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// ============================
// IMPORTS
// ============================
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { MdClose, MdDone } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import ReactDropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import bytesToSize from "@/utils/bytes-to-size";
import compressFileName from "@/utils/compress-file-name";
import fileToIcon from "@/utils/file-to-icon";
import type { Action } from "../../../types";
import { useTranslations } from "next-intl";

// ============================
// ESTENSIONI SUPPORTATE
// ============================
const extensions = {
  image: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "ico", "tif", "tiff", "svg", "raw", "tga"],
  video: ["mp4", "m4v", "mp4v", "3gp", "3g2", "avi", "mov", "wmv", "mkv", "flv", "ogv", "webm", "h264", "264", "hevc", "265"],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export default function Dropzone() {
  const t = useTranslations("dropzone");
  const { toast } = useToast();

  const [is_hover, setIsHover] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [is_ready, setIsReady] = useState(false);
  const [is_converting, setIsConverting] = useState(false);
  const [is_done, setIsDone] = useState(false);

  // Formato separato per ogni tipo di file
  const [imageFormat, setImageFormat] = useState<string>("");
  const [videoFormat, setVideoFormat] = useState<string>("");
  const [audioFormat, setAudioFormat] = useState<string>("");

  const [hasImage, setHasImage] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const accepted_files = {
    "image/*": extensions.image.map(ext => `.${ext}`),
    "audio/*": extensions.audio.map(ext => `.${ext}`),
    "video/*": extensions.video.map(ext => `.${ext}`),
  };

  const applyImageFormat = (format: string) => {
    setImageFormat(format);
    setActions(actions.map(action => {
      if (action.file_type.startsWith("image")) {
        return { ...action, to: format };
      }
      return action;
    }));
  };

  const applyVideoFormat = (format: string) => {
    setVideoFormat(format);
    setActions(actions.map(action => {
      if (action.file_type.startsWith("video")) {
        return { ...action, to: format };
      }
      return action;
    }));
  };

  const applyAudioFormat = (format: string) => {
    setAudioFormat(format);
    setActions(actions.map(action => {
      if (action.file_type.startsWith("audio")) {
        return { ...action, to: format };
      }
      return action;
    }));
  };

  const handleUpload = (data: File[]) => {
    setIsHover(false);
    const tmp: Action[] = data.map(file => ({
      file_name: file.name,
      file_size: file.size,
      from: file.name.split(".").pop() || "",
      to: null,
      file_type: file.type,
      file,
      is_converted: false,
      is_converting: false,
      is_error: false,
    }));
    setFiles(data);
    setActions(tmp);
  };

  const updateAction = (file_name: string, to: string) => {
    setActions(actions.map(action =>
      action.file_name === file_name ? { ...action, to } : action
    ));
  };

  const deleteAction = (action: Action) => {
    setActions(actions.filter(a => a !== action));
    setFiles(files.filter(f => f.name !== action.file_name));
  };

  const convert = async () => {
    let tmp_actions = actions.map(a => ({ ...a, is_converting: true }));
    setActions(tmp_actions);
    setIsConverting(true);

    for (const action of tmp_actions) {
      try {
        const formData = new FormData();
        formData.append("files", action.file);
        formData.append("to", action.to!);

        const res = await fetch("http://localhost:5050/convert", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Errore backend");

        const blob = await res.blob();
        const filename = res.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/\"/g, "") || "converted";

        const url = URL.createObjectURL(blob);
        tmp_actions = tmp_actions.map(a =>
          a === action ? { ...a, is_converted: true, is_converting: false, url, output: filename } : a
        );
        setActions(tmp_actions);
      } catch {
        tmp_actions = tmp_actions.map(a =>
          a === action ? { ...a, is_converted: false, is_converting: false, is_error: true } : a
        );
        setActions(tmp_actions);
      }
    }

    setIsConverting(false);
    setIsDone(true);
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.href = action.url!;
    a.download = action.output || "download";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url!);
    document.body.removeChild(a);
  };

  const downloadAll = async () => {
    const validActions = actions.filter(a => !a.is_error);
    if (validActions.length === 1) return download(validActions[0]);

    const zip = new JSZip();
    for (const action of validActions) {
      const res = await fetch(action.url!);
      const blob = await res.blob();
      zip.file(action.output || "converted", blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "converted_files.zip");
  };

  useEffect(() => {
    setIsReady(actions.every(a => a.to));
    const imageFiles = actions.filter(a => a.file_type.startsWith("image"));
    const videoFiles = actions.filter(a => a.file_type.startsWith("video"));
    const audioFiles = actions.filter(a => a.file_type.startsWith("audio"));
    setHasImage(imageFiles.length >= 2);
    setHasVideo(videoFiles.length >= 2);
    setHasAudio(audioFiles.length >= 2);
  }, [actions]);

  return (
    <div className="space-y-6">
      {/* DROPZONE UPLOAD AREA */}
      <ReactDropzone
        onDrop={handleUpload}
        onDragEnter={() => setIsHover(true)}
        onDragLeave={() => setIsHover(false)}
        accept={accepted_files}
        onDropRejected={() => toast({
          variant: "destructive",
          title: "File non supportato",
          description: "Ammessi solo immagini, video o audio.",
        })}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="bg-background h-72 border-2 border-dashed rounded-3xl flex items-center justify-center">
            <input {...getInputProps()} />
            <div className="text-center space-y-4 text-foreground">
              <div className="text-5xl">{is_hover ? <LuFileSymlink /> : <FiUploadCloud />}</div>
              <h3 className="text-2xl font-semibold">{is_hover ? t("titleHover") : t("title")}</h3>
            </div>
          </div>
        )}
      </ReactDropzone>

      {/* ACTION BAR SEMPRE VISIBILE */}
      {actions.length > 0 && (
        <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
          <h2 className="font-semibold text-lg">{t("filesToConvert")}</h2>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Selettore per immagini */}
            {hasImage && actions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Immagini:</span>
                <Select onValueChange={applyImageFormat} value={imageFormat}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("formatPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {extensions.image.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Selettore per video */}
            {hasVideo && actions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Video:</span>
                <Select onValueChange={applyVideoFormat} value={videoFormat}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("formatPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {extensions.video.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Selettore per audio */}
            {hasAudio && actions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Audio:</span>
                <Select onValueChange={applyAudioFormat} value={audioFormat}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("formatPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {extensions.audio.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button onClick={convert} disabled={!is_ready || is_converting}>
              {is_converting ? <ImSpinner3 className="animate-spin mr-2" /> : null}
              {t("convertAll")}
            </Button>

            <Button onClick={downloadAll} disabled={!is_done}>{t("downloadAll")}</Button>
          </div>
        </div>
      )}

      {/* FILES PREVIEW LIST */}
      {actions.map((action, index) => (
        <div key={index} className="flex justify-between items-center p-4 border rounded-2xl shadow-sm bg-white dark:bg-muted/20 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-orange-500">{fileToIcon(action.file_type)}</span>
            <div>
              <p className="font-medium truncate max-w-[200px]">{compressFileName(action.file_name)}</p>
              <p className="text-sm text-muted-foreground">{bytesToSize(action.file_size)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {action.is_error ? (
              <Badge variant="destructive"><BiError className="mr-1" /> Errore</Badge>
            ) : action.is_converted ? (
              <Badge className="bg-green-500 text-white"><MdDone className="mr-1" /> Fatto</Badge>
            ) : action.is_converting ? (
              <Badge><ImSpinner3 className="animate-spin mr-1" /> In conversione</Badge>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">Converti in</span>
                <Select onValueChange={(value) => updateAction(action.file_name, value)} value={action.to || ""}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    {action.file_type.includes("image") && extensions.image.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                    {action.file_type.includes("video") && extensions.video.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                    {action.file_type.includes("audio") && extensions.audio.map(ext => (
                      <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.is_converted ? (
              <Button variant="outline" size="sm" onClick={() => download(action)}>
                <HiOutlineDownload className="mr-2" /> Scarica
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => deleteAction(action)}>
                <MdClose className="text-xl" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
