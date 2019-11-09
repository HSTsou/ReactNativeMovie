import { combineEpics } from 'redux-observable';
import movieEpic from '../epics/movieEpic';

const rootEpic = combineEpics(movieEpic);

export default rootEpic;
