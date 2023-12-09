import {Router} from 'express';

import apiMap from '../routes/faps/map.routes'
import apiMapFilter from '../routes/faps/filter.routes'
import apiMapSingle from '../routes/faps/single.routes'
import apiMapOrg from '../routes/faps/org.routes'
import apiView from '../routes/faps/view.routes'
import apiDetail from '../routes/faps/detail.routes'
import apiReports from '../routes/faps/reports.routes'
import apiReportsArea from '../routes/faps/area.routes'
import apiReportsPDF from '../routes/faps/pdf.routes'
import apiReportsWord from '../routes/faps/word.routes'
import apiUpload from '../routes/faps/upload.routes'
import apiAddress from '../routes/faps/address.routes'
import apiLocation from '../routes/faps/location.routes'

// expert system
import apiDev from '../routes/expert_system/dev_fetch_data.routes'
import apiDist from '../routes/expert_system/distance.routes'

import apiEdit from '../routes/faps/edit.routes'
import apiPoints from '../routes/expert_system/points.routes'

import apiUploads from '../routes/expert_system/uploads.routes'

// guaranteed to get dependencies
export default () => {
    const app = Router();
    apiMap(app);
    apiMapFilter(app);
    apiMapSingle(app);
    apiMapOrg(app);
    apiView(app);
    apiDetail(app);
    apiReports(app);
    apiReportsArea(app);
    apiReportsPDF(app);
    apiReportsWord(app);
    apiUpload(app);
    apiAddress(app);
    apiLocation(app);
    apiEdit(app);
    // expert
    apiDev(app);
    apiDist(app);
    apiPoints(app);
    // reports
    apiUploads(app);
    return app
}