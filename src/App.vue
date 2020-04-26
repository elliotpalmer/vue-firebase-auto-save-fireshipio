<template>
  <div id="app">
    <div class="container px-3">

    <h1 class='title is-1'>Auto-Updating Firebase Example</h1>
    <h3 class='subtitle is-3'>
        <a href="https://fireship.io/lessons/vue-autosaving-forms-with-firestore/"> Fireship.io Example</a>
    </h3>

    <div class="box has-background-primary" style="margin:1rem 0; padding: .5rem">

    <div v-if="state === 'synced'">
      Form is synced with Firestore
    </div>
    <div v-else-if="state === 'modified'">
      From data changed, will sync with Firebase
    </div>
    <div v-else-if="state === 'revoked'">
      From data and Firebase revoked to original data
    </div>
    <div v-else-if="state === 'error'">
      Failed to save to Firestore. {{ errorMessage }}
    </div>
    <div v-else-if="state === 'loading'">Loading...</div>

    </div>

    <form @submit.prevent="updateFirebase" @input="fieldUpdate">

      <div class="columns">

        <div class="column">
          <label for="name" class="title is-5">Name</label>
          <input class='input is-primary ' type="text" name="name" v-model="formData.name" />
        </div>  
        <div class="column">
          <label for="email" class="title is-5">E-Mail</label>
          <input class='input is-primary ' type="email" name="email" v-model="formData.email" />
        </div>  
        <div class="column">
          <label for="phone" class="title is-5">Phone #</label>
          <input class='input is-primary ' type="tel" name="phone" v-model="formData.phone" />
        </div>  

      </div>


     
    <button class="button is-primary" type="submit" :disabled="state!='modified'">Save Changes</button>

    </form>

    <br>
  <hr>
    <br>

<div class="columns">
  <div class="column">
    <div class="box">
    <h3 class="subtitle is-4">Firebase Data:</h3>
    <ul style='margin-left: 2rem'>
      <li>🔵 Name: {{firebaseData.name}}</li>
      <li>🔵 E-Mail: {{firebaseData.email}}</li>
      <li>🔵 Phone: {{firebaseData.phone}}</li>
    </ul>
  </div>
</div>
    <div class="column">
      <div class="box">
      <h3 class="subtitle is-4">Local Data:</h3>
      <ul style='margin-left: 2rem'>
        <li>🔵 Name: {{formData.name}}</li>
        <li>🔵 E-Mail: {{formData.email}}</li>
        <li>🔵 Phone: {{formData.phone}}</li>
      </ul>
</div>
</div>
</div>

<iframe width="100%" height="739" src="https://www.youtube.com/embed/wvRVfyPKOA0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    </div>
  </div>
</template>


<script>

import { db } from './firebase';
import { debounce } from 'debounce';

const documentPath = 'contacts/jeff';

export default {
  data() {
    return {
      state: 'loading', // synced, modified, revoked, error
      firebaseData: null,
      formData: {},
      errorMessage: ''
    };
  },
  
  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = 'synced';
      } catch (error) {
        this.errorMessage = JSON.stringify(error)
        this.state = 'error';
      }
    },
    fieldUpdate() {
      this.state = 'modified';
      this.debouncedUpdate();
    },
    debouncedUpdate: debounce(function() {
      this.updateFirebase()
    }, 3000)
  },


  firestore() {
    return {
      firebaseData: db.collection('contacts').doc('jeff'),
    };
  },
  created: async function () {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get() ).data();

    if (!data) {
      data = { name: '', phone: '', email: '' }
      docRef.set(data)
    }

    this.formData = data;
    this.state = 'synced'
  },
}
    

</script>

<style scoped>

</style>



