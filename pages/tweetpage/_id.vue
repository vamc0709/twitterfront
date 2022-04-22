<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="primary" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TWITTER</b-navbar-brand>
      </b-navbar>
            <div>
        <div v-if="isUpdating">
          <p>
            <input type="text" v-model="title" />
          </p>
        </div>
        <h1 v-else>{{ tweet.title }}</h1>
        <div class="btns" v-if="tweet.user_id == user_id">
          <button  class="btn" v-if="!isUpdating" @click="updateTweet">
            Update
          </button>
          <button
            v-if="!isUpdating"
            class="btn-danger"
            @click="deleteTweet(tweet.tweet_id)"
          >
            Delete
          </button>
          <button class="button" v-else @click="submitTweet">Submit</button>
        </div>
      </div>
      <div>
      </div>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Comment here</label>
      <textarea
        class="form-control"
        v-model="newComment"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="createComment">
      Add Comment
    </button>
    <div>
      <b-collapse visible id="collapse-3">
        <b-card
          class="delete-button"
          v-for="comment in current_comments"
          :key="comment.id"
          ><p>{{ comment.text }}</p>
          <b-button
            v-if="comment.user_id == user_id"
            @click="deleteComment(comment.comment_id)"
            class="btn3"
            pill
            size="sm"
            variant="danger"
            >Delete</b-button
          >
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['current_comments', 'tweet','title','tweet_user_id','user_id']),
  },
  data() {
    return {
      isUpdating: false,
      newPostText: '',
      title: '',
      newComment: '',
      
    }
  },
  methods: {
              // check
    async deleteComment(comment_id) {
      await this.$store.dispatch('deleteComment', comment_id)
    },

    async createComment() {
      console.log(' in here to create a comment')
      await this.$store.dispatch('addComment', {
        text: this.newComment,
        tweet_id: this.$route.params.id,
      })
              // check


      // calling here. see?
      await this.$store.dispatch('GetAllTweets')
    },
   updateTweet() {
      this.isUpdating = true
      this.title = this.tweet.title
    },
    async submitTweet() {
      this.isUpdating = false
      await this.$store.dispatch('updateTweet', this.title)
      this.$store.commit('updateTweet', this.title)
    },
    async deleteTweet(tweet_id) {
      await this.$store.dispatch('deleteTweet', tweet_id)
      this.$router.push('/HomePage')
    },
  },

}
</script>

<style scoped>

</style>