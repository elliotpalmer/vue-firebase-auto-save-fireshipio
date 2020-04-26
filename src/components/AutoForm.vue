<template>
  <div id="app">

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


    <form @submit.prevent="updateFirebase" @input="fieldUpdate">

      <input type="text" name="name" v-model="formData.name" />
      <input type="email" name="name" v-model="formData.email" />
      <input type="tel" name="name" v-model="formData.phone" />

      <button type="submit" v-if="state === 'modified'">Save Changes</button>

    </form>
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
    fieldUpdate() {
      this.state = 'modified';
      this.debouncedUpdate();
    },
    debouncedUpdate: debounce(function() {
      this.updateFirebase()
    }, 1500)
  },


  firestore() {
    return {
      firebaseData: db.doc(documentPath),
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



