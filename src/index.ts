import { V2exJobManage } from "./services/v2exJobManage";
import * as dotenv from "dotenv";
dotenv.config();
new V2exJobManage().postJobAd();
