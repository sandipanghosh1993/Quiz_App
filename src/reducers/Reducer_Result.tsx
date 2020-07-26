import { SEND_RESULT } from '../actions/types';

export default function(state = null, action: any) {
  switch (action.type) {
    case SEND_RESULT:
      return action.payload;
  }
  return state;
}
