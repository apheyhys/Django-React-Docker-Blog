import {combineReducers} from 'redux';

import collapseComments from "./collapseComments";
import searchText from "./searchText";
import socialDialog from "./socialDialog";
import tag from './tag';
import userAccess from "./userAccess";
import userName from "./userName";
import userPicture from "./userPicture";
import userSurname from "./userSurname";
import userUid from "./userUid";
import offset from "./pageOffsets";

const rootReducer = combineReducers({
    tag,
    offset,
    searchText,
    userAccess,
    userName,
    userPicture,
    userSurname,
    userUid,
    collapseComments,
    socialDialog
});

export default rootReducer;