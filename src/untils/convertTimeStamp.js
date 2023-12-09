import moment from "moment";
import "moment-timezone";

const convertTimeStamp = (timestamp) => {
    const formattedDate = moment(timestamp)
      .tz("Asia/Ho_Chi_Minh")
      .format("DD [tháng] MM YYYY HH:mm:ss");
    return formattedDate;
  };

  export default convertTimeStamp;