const state = () => ({
    token: null,
    user_id: null,
    email: null,
    username: null,
    is_register: false,
    tweets: [],
    current_tweet: null,
    current_comments: [],
    tweet: [],
    
})

const getters = {}

const mutations = {
    setToken(state, data) {
        state.token = data.token
        state.user_id = data.user_id
        state.email = data.email
        state.username = data.username
    },

    setName(state, data) {
        state.username = data;
        alert(" Updated name successfully")
    },

    setIsRegister(state, value) {
        state.is_register = value;
        // console.log(state.is_register)
    },

    setList(state, data) {
        state.tweets = data
    },

    createdNewTweet(state, data) {
        state.tweets.unshift(data)
        this.$router.push('/HomePage')
    },

    setComments(state, data) {
        console.log("comments" + data)
        state.current_comments = data
        console.log("after set" + state.current_comments)
    },
    setCurrentTweet(state, data) {
        state.current_tweet = data
    },

    createdNewComment(state, data) {
        state.current_comments = state.data
    },
    deleteTweet(state, tweet_id) {
        state.tweets = state.tweets.filter(function (item) {
            console.log(" to check : " + item.tweet_id + "  with " + tweet_id);
            return item.tweet_id != tweet_id
        });
    },
    deleteComment(state, comment_id) {
        state.current_comments = state.current_comments.filter(function (item) {
            console.log(" to check : " + item.comment_id + "  with " + comment_id);
            return item.comment_id != comment_id
        });
    },

    updateTweet(state, data) {
        const index = state.tweets.findIndex(tweet => tweet.tweet_id === data.tweet_id)
        console.log(" required index is : " + index);
        console.log(" tweet in index " + index + " is " + state.tweets[index]);
        state.tweets[index].title = data.title
        state.current_tweet.title = data.title
    }

    // updateTodo(state, data) {
    //     const index = state.todos.findIndex(todo => todo.id === data.id)
    //     state.todos[index].title = data.title
    //     state.todos[index].is_complete = data.is_complete
    // }
}

const actions = {

    async setIsRegister(state, value) {
        this.commit('setIsRegister', value)
    },

    async registerUser(state, data) {
        try {
            console.log("data:" + data);
            // Hit the backend api.
            const res = await this.$axios.post('user/', {
                username: data.username,
                email: data.email,
                password: data.password,
            })

            if (res.status == 201) {
                console.log(res)

                alert("Registration successful, please login to continue");

                this.commit('setIsRegister', false);

            } else {
                alert('Registration failed, please check details')
            }
        } catch (e) {
            console.log(' error while registering user : ' + e)
            alert(' cannot register right now, please try again later')
        }
    },

    async login(state, data) {
        try {
            //console.log("data:" + data.username);
            // Hit the backend api.
            const res = await this.$axios.post('user/login/', {
                email: data.email,
                password: data.password,
            })

            if (res.status == 200) {
                console.log(res)

                // Set the token after the call is success.
                this.commit('setToken', res.data)
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                // move to the homepage from login page.
                this.$router.push('/HomePage')
                return true;
            } else {
                alert('Invalid username or password')
                return false;
            }
        } catch (e) {
            console.log(' error while logging in: ' + e)
            alert(' cannot login right now, please try again later')
            return false;
        }
    },

    async GetAllTweets({ commit, state }) {
        const res = await this.$axios.get('tweet')
        console.log(res.data)
        commit('setList', res.data)
    },

    async createTweet({ commit, state }, data) {
        const res = await this.$axios.post('tweet', data)
        commit('createdNewTweet', res.data)
    },
    async addComment({ commit, state }, data) {
        const res = await this.$axios.post('comment', data)
        commit('createdNewPost', res.data)
      },

      async deleteTweet({ commit }, tweet_id) {
        try {
            var res = await this.$axios.delete('tweet/' + tweet_id)
            if (res.status == 204) {

                commit('deleteTweet', tweet_id)
                this.$router.push('/HomePage')
            } else {
                alert(" Cannot delete this tweet right now, sorry!")
            }
        } catch (e) {
            if (e.response.status == 403) {
                alert(" You cannot delete others' tweet")
            } else {

                alert(" error!  " + e.response.status)
            }

        }

    },
    async deleteComment({ commit, state }, comment_id) {
        const res = await this.$axios.delete('comment/'+ comment_id,)
        // commit('createdNewPost', res.data)
    
    //   async deleteComment({ commit, state }, comment_id) {
    //     try {
    //         var res = await this.$axios.delete('comment/' + comment_id)
    //         if (res.status == 204) {

    //             commit('deleteComment', comment_id)

    //         } else {
    //             alert(" Cannot delete this comment right now")
    //         }
    //     } catch (e) {
    //         if (e.response.status == 403) {
    //             alert(" You cannot delete others' comment")
    //         } else {

    //             alert("error!  " + e.response.status)
    //         }
    //     }
        // const res = await this.$axios.delete('comment/'+ comment_id,)
        // commit('createdNewPost', res.data)
    },

    async updateProfile({state}, data) {
        try {
            // Hit the backend api.
            const res = await this.$axios.put('user/'+state.user_id, data)
            console.log(res.status)                    
            if (res.status == 204) {
                console.log(res)

                // Set the name after the call is success.
                this.commit('setName', data.username)


            } else {
                alert('Cannot update profile')
            }
        } catch (e) {
            console.log(' error while updating profile : ' + e)
            alert(' Cannot update profile right now, please try again later')
        }
    },
    async loadTweet({ commit, state }, tweet_id) {
        const res = await this.$axios.get('tweet/' + tweet_id)
        console.log(res.data)
        commit('setCurrentTweet', res.data)
    },

    async GetAllCommentsForTweet({ commit, state },tweet_id) {
        // console.log("store called" + $id);

        const res = await this.$axios.get('comment/' + tweet_id)
        console.log(res.data)
        commit('setComments', res.data)

    },
    async updateTweet({ commit }, data) {
        console.log("data is not found" + data.tweet_id)
        var res = await this.$axios
            .put(
                'tweet/' + data.tweet_id,
                { title: data.title },

            );


        if (res.status == 200 || res.status == 204) {
            console.log(res)
            console.log('called')
            commit("updateTweet", data)
            return true;
        } else {
            return false;
        }


    },
    async addComment({ commit, state }, data) {
        const res = await this.$axios.post('comment/', data)
        commit('createdNewComment', res.data)
    }


}

export default {
    state,
    getters,
    mutations,
    actions,
}
