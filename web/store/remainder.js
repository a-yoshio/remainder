import { Remainder } from '../models/remainder';
import { get_all } from '../services/remainders';

export default {
    state: () => ({
        list: []
    }),
    mutations: {
        add_remainder(state, id, contents, user_id, tag_id, datetime, complete) {
            state.list.push(
                new Remainder(id, contents, user_id, tag_id, datetime, complete)
            )
        },
    },
    actions: {
        async get_all(context, user_id) {
            try {
                const remainder_list = await get_all(user_id)
                remainder_list.forEach((remainder) => context.commit('add_remainder', {remainder}))
            } catch(e) {
                console.error(e);
            }
        },
    },
};
