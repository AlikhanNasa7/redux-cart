import { configureStore,createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:'cart',
    initialState: {
        items : [],
        totalQuantity: 0
    },
    reducers:{
        replaceCart(state,action){
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItem(state,action){
            const newItem = action.payload
            console.log(newItem.id)
            const existingItem = state.items.find(item=>item.itemId===newItem.id)
            console.log(existingItem)
            state.totalQuantity+=1
            if (!existingItem){
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity:newItem.quantity,
                    totalPrice: newItem.price* newItem.quantity,
                    name: newItem.title
                })
            }else{
                existingItem.quantity+=1
                existingItem.totalPrice+= existingItem.price
            }
        },
        removeItem(state,action){
            const id = action.payload
            const neededItemIndex = state.items.findIndex(item=>item.itemId===id)
            if (state.items[neededItemIndex].quantity===1){
                state.items = state.items.filter(item=>item.itemId!==id)
            }else{
                state.items[neededItemIndex].quantity-=1
                state.items[neededItemIndex].totalPrice -= state.items[neededItemIndex].price
            }
        }
    }
})

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        notification: null
    },
    reducers:{
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotification(state,action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

const store = configureStore({
    reducer: {cart: cartSlice.reducer, ui:uiSlice.reducer}
})

export function sendCartData(cart){
    return async (dispatch) => {

        dispatch(uiActions.showNotification({
            status:'pending',
            title: 'Sending',
            message: 'Sending cart data!'
        }))
        
        async function sendRequest(){
            const response = fetch('https://reactpractice-f5d9b-default-rtdb.firebaseio.com/cart.json',{
                method: 'PUT',
                body: JSON.stringify(cart)
            })

            if (!response.ok){
                throw new Error('Sending cart data failed!')
            }
        }

        try{
            await sendRequest()

            dispatch(uiActions.showNotification({
                status:'success',
                title: 'Success',
                message: 'Sent cart data successfully!'
            }))
        }catch (error){
            dispatch(uiActions.showNotification({
                status:'error',
                title: 'Error',
                message: 'Could not save your data!'
            }))
        }
    }
}

export function fetchCartData(){
    return async dispatch => {
        async function fetchData(){
            const response = await fetch('https://reactpractice-f5d9b-default-rtdb.firebaseio.com/cart.json')

            if (!response.ok){
                throw new Error('Could not fetch cart data!')
            }
            const data = await response.json()
            return data
        }

        try{
            const data = await fetchData()
            console.log(data)
            dispatch(cartActions.replaceCart(data))
        }catch (error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Could not fetch the data!'
            }))
        }

    }
}
export const cartActions = cartSlice.actions
export const uiActions = uiSlice.actions

export default store