import 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import rootEpic from './data/epics';

export default combineEpics(rootEpic);
