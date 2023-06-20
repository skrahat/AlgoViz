// sagas.js

import { takeLatest, put, delay, race, take } from 'redux-saga/effects';
import {
    sortInProgressAction,
    sortNumbersBubbleAction,
    iterationsCompletedAction,
    sortedAction
} from '../reducers/actions';

export function* bubbleSortSaga(action: any) {
    const { result, algoStop } = action.payload;
    const newArray = [...result];
    const len = newArray.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            const { stop } = yield race({
                delay: delay(1000 / len),
                stop: take('STOP_BUBBLE_SORT') // Listen for the stop action
            });

            if (stop) {
                yield put(sortedAction(false));
                return;
            }

            if (newArray[j].value > newArray[j + 1].value) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;

                const sortedArray = newArray.map((item, index) => {
                    if (index === j || index === j + 1) {
                        if (item.color === 'red') {
                            return { ...item, color: 'blue' };
                        } else {
                            return { ...item, color: 'red' };
                        }
                    }
                    return item;
                });

                yield put(sortNumbersBubbleAction(sortedArray));
                yield put(iterationsCompletedAction(false));
            }
        }
    }

    const sortedArray = newArray.map((item) => {
        return { ...item, color: 'green' };
    });

    yield put(sortNumbersBubbleAction(sortedArray));
    yield put(sortInProgressAction());
    yield put(sortedAction(true));
}

export function* watchBubbleSortSaga() {
    yield takeLatest('START_BUBBLE_SORT', bubbleSortSaga);
}
