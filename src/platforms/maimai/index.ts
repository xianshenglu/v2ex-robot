import * as dotenv from "dotenv";
import { MaiMaiAdService } from "./maimaiAdService";
dotenv.config();
new MaiMaiAdService().postAd();
