import { uploadToCloudflare } from "@/utils/upload2Cloudflare";
import { uploader } from "@/utils/uploader";
import { Router } from "express";

const router = Router();

router.post("/upload", ...uploader("file", uploadToCloudflare))