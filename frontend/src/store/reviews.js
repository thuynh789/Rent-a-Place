import { csrfFetch } from "./csrf";

// constant action types
const GET_SPOT_REVIEWS = "spots/GET_SPOT_REVIEWS"
const ADD_REVIEW = "spots/ADD_REVIEW"
const DELETE_REVIEW = "spots/DELETE_REVIEW"

//ACTION CREATORS
export const getSpotReviewsAC = (reviews) => ({
	type: GET_SPOT_REVIEWS,
    reviews
})

export const addReviewAC = (review) => ({
    type: ADD_REVIEW,
    review
})

export const deleteReviewAC = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


//THUNKS
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const reviews = await res.json()
        dispatch(getSpotReviewsAC(reviews))
        return reviews
    }
    return res
}

export const createReviewThunk = (spotId, newReview, reviewExtras) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    })
    if (res.ok) {
        const reviews = await res.json()
        const reviewObj = {...reviews, ...reviewExtras}
        dispatch(addReviewAC(reviewObj))
        return reviewObj
    }
    return res
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const deletedReview = await res.json()
        dispatch(deleteReviewAC(reviewId))
        return deletedReview
    }
    return res
}

//REDUCERS

const initialState = {
    spot: {},
    user: {},
}

export default function reviewReducer(state = initialState, action){
    switch (action.type) {


        case GET_SPOT_REVIEWS: {
            const newState = { spot: {}, user: {} }
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            return newState
        }

        case ADD_REVIEW: {
            const newState = { spot:{...state.spot}, user:{} }
            newState.spot[action.review.id] = action.review
            return newState
        }

        case DELETE_REVIEW: {
            const newState = { spot:{...state.spot}, user: {} };
            delete newState.spot[action.reviewId];
            return newState;
        }

        default:
            return state
    }
}
